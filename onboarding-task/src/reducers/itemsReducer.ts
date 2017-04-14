import { Map } from 'immutable';
import { itemReducer } from './itemReducer';
import { ADD_ITEM, DELETE_ITEM, ENABLE_EDIT_ITEM, SAVE_CHANGES_TO_ITEM, CANCEL_CHANGES_TO_ITEM } from '../constants/actionTypes';
import { IAction } from '../interfaces/IAction';

const itemsReducer = (state = Map(), action: IAction) => {
  switch (action.type) {
    case ADD_ITEM:
      return state.set(action.payload.id, itemReducer(undefined, action));

    case DELETE_ITEM:
      return state.delete(action.payload.id);

    case ENABLE_EDIT_ITEM:
    case SAVE_CHANGES_TO_ITEM:
    case CANCEL_CHANGES_TO_ITEM: {
      console.log('itemsReducer state: ', state);
      const currentItem = state.get(action.payload.id);
      console.log('itemsReducer: current item: ', currentItem);
      const editedItem = itemReducer(undefined, action);

      return state.set(action.payload.id, editedItem);
    }

    default:
      return state;
  }
};

export { itemsReducer };
