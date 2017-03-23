import {
  ITEM_CREATE,
  ITEM_DELETE,
  ITEM_UPDATE,
} from '../actions/actionTypes.js';
import { Map } from 'immutable';
import { itemReducer } from './itemReducer.js';

const itemsByIdReducer = (state = Map(), action) => {
  switch (action.type) {
    case ITEM_CREATE: {
      const newItem = itemReducer(undefined, action);
      return state.set(action.payload.id, newItem);
    }
    case ITEM_UPDATE: {
      const updatedItem = itemReducer(state.get(action.payload.id), action);
      return state.set(action.payload.id, updatedItem);
    }
    case ITEM_DELETE:
      return state.delete(action.payload.id);
    default:
      return state;
  }
};

export { itemsByIdReducer };
