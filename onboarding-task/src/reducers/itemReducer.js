import {
  ITEM_CREATE,
  ITEM_UPDATE,
  ITEM_TOGGLE_EDIT,
} from '../actions/actionTypes.js';
import { Item } from '../models/Item.js';

const itemReducer = (prevState = new Item(), action) => {
  switch (action.type) {
    case ITEM_CREATE:
      return new Item({
        id: action.payload.id,
        text: action.payload.text,
      });
    case ITEM_UPDATE:
      return prevState.merge({ text: action.payload.text });
    case ITEM_TOGGLE_EDIT:
      return prevState.merge({ editing: !prevState.editing });
    default:
      return prevState;
  }
};

export { itemReducer };
