import { Item } from '../models/Item';
import { ADD_ITEM, ENABLE_EDIT_ITEM, SAVE_CHANGES_TO_ITEM, CANCEL_CHANGES_TO_ITEM } from '../constants/actionTypes';
import { IAction } from '../interfaces/IAction';

const itemReducer = (state = new Item(), action: IAction) => {
  switch (action.type) {
    case ADD_ITEM: {
      const item = new Item({ id: action.payload.id, text: action.payload.text, isEdited: false });
      return item;
    }

    case ENABLE_EDIT_ITEM:
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

