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
      return prevState.set(action.payload.id, newItem);
    }
    case ITEM_UPDATE: {
      const updatedItem = itemReducer(prevState.get(action.payload.id), action);
      return prevState.set(action.payload.id, updatedItem);
    }
    case ITEM_DELETE:
      return prevState.delete(action.payload.id);
    case ITEM_TOGGLE_EDIT: {
      // change locally using getIn/setIn??
      const toggledId = itemReducer(prevState.get(action.payload.id), action);
      return prevState.set(action.payload.id, toggledId);
    }
    default:
      return prevState;
  }
};

export { itemsReducer };
