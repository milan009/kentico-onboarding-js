import { Map } from 'immutable';
import { manageItem } from './manageItem.js';
import { ADD_ITEM, DELETE_ITEM, EDIT_ITEM, SAVE_CHANGES_TO_ITEM, CANCEL_CHANGES_TO_ITEM } from '../constants/actionTypes.js';

const manageItems = (state = Map(), action) => {
  switch (action.type) {
    case ADD_ITEM:
      return state.set(action.payload.id, manageItem(undefined, action));

    case DELETE_ITEM:
      return state.delete(action.payload.id);

    case EDIT_ITEM:
    case SAVE_CHANGES_TO_ITEM:
    case CANCEL_CHANGES_TO_ITEM: {
      const stateItem = state.get(action.payload.id);
      const editedItem = manageItem(stateItem, action);

      return state.set(action.payload.id, editedItem);
    }

    default:
      return state;
  }
};

export { manageItems };
