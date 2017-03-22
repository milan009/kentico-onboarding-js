import {
  ITEM_CREATE,
  ITEM_UPDATE,
  ITEM_TOGGLE_EDIT,
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
    case ITEM_TOGGLE_EDIT:
      return prevState.merge({ editing: !prevState.editing });
    default:
      return prevState;
  }
};

export { itemReducer };
