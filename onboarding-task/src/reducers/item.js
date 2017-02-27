/**
 * Created by IvanJ on 21.2.2017.
 */
import { ADD_ITEM, TOGGLE_EDIT_MODE, DELETE_ITEM, UPDATE_ITEM } from '../actions/actionTypes.js';
import { itemRecord } from '../utils/itemRecord';

const item = (state = itemRecord({}), action) => {
  switch (action.type) {
    case ADD_ITEM: {
      const newItem = itemRecord({
        guid: action.payload.guid,
        text: action.payload.text,
        isEdited: false,
      });
      return newItem;
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
