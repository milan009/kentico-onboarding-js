import { Map } from 'immutable';
import { manageItem } from './manageItem.js';
import { ADD_ITEM, DELETE_ITEM, EDIT_ITEM, SAVE_CHANGES_TO_ITEM, CANCEL_CHANGES_TO_ITEM } from '../actionTypes.js';

const manageItems = (state = Map(), action) => {
  switch (action.type) {
    case ADD_ITEM:
      return state.merge(manageItem(undefined, action));

    case DELETE_ITEM:
      return state.delete(action.id);

    case EDIT_ITEM: {
      const stateItem = state.get(action.id);
      const editedItem = manageItem(stateItem, action);

      return state.merge(editedItem);
    }

    case SAVE_CHANGES_TO_ITEM: {
      const stateItem = state.get(action.id);
      const editedItem = manageItem(stateItem, action);

      return state.merge(editedItem);
    }

    case CANCEL_CHANGES_TO_ITEM: {
      const stateItem = state.get(action.id);
      const editedItem = manageItem(stateItem, action);

      return state.merge(editedItem);
    }

    default:
      return state;
  }
};

export { manageItems };
