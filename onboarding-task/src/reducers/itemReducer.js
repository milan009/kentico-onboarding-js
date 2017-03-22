import {
  ITEM_CREATE,
  ITEM_UPDATE,
} from '../actions/actionTypes.js';
import { Item } from '../components/Item.js';

const itemReducer = (prevState = new Item(), action) => {
  switch (action.type) {
    case ITEM_CREATE:
      return new Item({
        id: action.value.id,
        text: action.value.text,
      });
    case ITEM_UPDATE:
      return prevState.merge({ text: action.value.text });
    default:
      return prevState;
  }
};

export { itemReducer };
