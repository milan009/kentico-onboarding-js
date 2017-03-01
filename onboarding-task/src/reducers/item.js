import { ADD_ITEM, TOGGLE_EDIT_MODE, UPDATE_ITEM } from '../actions/actionTypes.js';
import { itemRecord } from '../utils/itemRecord';

const item = (state = itemRecord({}), action) => {
  switch (action.type) {
    case ADD_ITEM: {
      return new itemRecord({
        guid: action.payload.guid,
        text: action.payload.text,
        isEdited: false,
      });
    }
    case TOGGLE_EDIT_MODE: {
      return state.set('isEdited', !state.isEdited);
    }
    case UPDATE_ITEM: {
      return state.set('text', action.payload.text).set('isEdited', false);
    }
    default:
      return state;
  }
};

export { item };
