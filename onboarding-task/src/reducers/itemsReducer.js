import {
  ITEM_CREATE,
  ITEM_DELETE,
  ITEM_UPDATE,
  ITEM_TOGGLE_EDIT,
} from '../actions/actionTypes.js';
import { Map } from 'immutable';
import { itemReducer } from './itemReducer.js';

const itemsReducer = (prevState = Map(), action) => {
  switch (action.type) {
    case ITEM_CREATE: {
      const newItem = itemReducer(undefined, action);
      return prevState.set(action.value.id, newItem);
    }
    case ITEM_UPDATE: {
      const updatedItem = itemReducer(prevState.get(action.value.id), action);
      return prevState.set(action.value.id, updatedItem);
    }
    case ITEM_DELETE:
      return prevState.delete(action.value.id);
    case ITEM_TOGGLE_EDIT: {
      const prevEdit = prevState.getIn([action.value.id, 'editing']);
      return prevState.setIn([action.value.id, 'editing'], !prevEdit);
    }
    default:
      return prevState;
  }
};

export { itemsReducer };
