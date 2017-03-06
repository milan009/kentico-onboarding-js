import { ADD_ITEM, UPDATE_ITEM_TEXT } from '../actions/actionTypes.js';
import { ItemRecord } from '../utils/itemRecord';

const item = (state = new ItemRecord({}), action) => {
  switch (action.type) {
    case ADD_ITEM: {
      return new ItemRecord({
        guid: action.payload.guid,
        text: action.payload.text,
      });
    }
    case UPDATE_ITEM_TEXT: {
      return state.set('text', action.payload.text);
    }
    default:
      return state;
  }
};

export { item };
