import { Item } from '../models/Item.js';
import { ADD_ITEM, EDIT_ITEM, SAVE_CHANGES_TO_ITEM, CANCEL_CHANGES_TO_ITEM } from '../actionTypes.js';

const manageItem = (state = new Item(), action) => {
  switch (action.type) {
    case ADD_ITEM: {
      return new Item({
        id: action.id,
        text: action.text,
        isEdited: false,
      });
    }

    case EDIT_ITEM: {
      return state.set('isEdited', true);
    }

    case SAVE_CHANGES_TO_ITEM: {
      const changes = { 'text': action.text, 'isEdited': false };
      return state.merge(changes);
    }

    case CANCEL_CHANGES_TO_ITEM: {
      return state.set('isEdited', false);
    }

    default:
      return state;
  }
};

export { manageItem };

