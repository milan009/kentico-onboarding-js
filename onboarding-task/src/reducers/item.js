import { ADD_ITEM, TOGGLE_EDIT_MODE, UPDATE_ITEM_TEXT } from '../actions/actionTypes.js';
import { ItemRecord } from '../utils/itemRecord';

const item = (state = ItemRecord({}), action) => {
  switch (action.type) {
    case ADD_ITEM: {
      return new ItemRecord({
        guid: action.payload.guid,
        text: action.payload.text,
        isEdited: false,
      });
    }
    case TOGGLE_EDIT_MODE: {
      return state.set('isEdited', !state.isEdited);
    }
    case UPDATE_ITEM_TEXT: {
      return state.set('text', action.payload.text).set('isEdited', false);
    }
    default:
      return state;
  }
};

export { item };
