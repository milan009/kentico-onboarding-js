import {
  UPDATE_TEXT_OF_ITEM,
  CREATE_ITEM_IN_LIST,
} from '../constants/actionTypes';
import { ItemRecord } from '../models/ItemRecord';

const itemReducer = (prevState = new ItemRecord(), action) => {
  switch (action.type) {
    case CREATE_ITEM_IN_LIST:
      return new ItemRecord({ id: action.payload.id, text: action.payload.text, formDisplayed: false });
    case UPDATE_TEXT_OF_ITEM: {
      return prevState.merge({ text: action.payload.text });
    }
    default:
      return prevState;
  }
};

export { itemReducer };
