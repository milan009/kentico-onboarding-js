import { Item } from '../models/Item.js';
import { ADD_ITEM, EDIT_ITEM, SAVE_CHANGES_TO_ITEM, CANCEL_CHANGES_TO_ITEM } from '../constants/actionTypes.js';

const itemReducer = (state = new Item(), action) => {
  switch (action.type) {
    case ADD_ITEM: {
      const item = new Item({ id: action.payload.id, text: action.payload.text, isEdited: false });
      return item;
    }

    case EDIT_ITEM:
      return state.set('isEdited', true);

    case SAVE_CHANGES_TO_ITEM: {
      const changes = { text: action.payload.text, isEdited: false };
      return state.merge(changes);
    }

    case CANCEL_CHANGES_TO_ITEM:
      return state.set('isEdited', false);

    default:
      return state;
  }
};

export { itemReducer };

