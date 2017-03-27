import {
  ITEM_CREATE,
  ITEM_UPDATE,
} from '../actions/actionTypes.js';
import { Item } from '../models/Item.js';

const itemReducer = (state = new Item(), action) => {
  switch (action.type) {
    case ITEM_CREATE:
      return new Item({
        id: action.payload.id,
        text: action.payload.text,
      });

    case ITEM_UPDATE:
      return state.merge({ text: action.payload.text });

    default:
      return state;
  }
};

export { itemReducer };
