import {
  ITEM_CREATE,
  ITEM_DELETE,
  ITEM_UPDATE,
  ITEM_TOGGLE_EDIT,
} from '../actions/actionTypes.js';
import { Map } from 'immutable';
import { itemReducer } from './itemReducer.js';

const itemsReducer = (state = Map(), action) => {
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
    case ITEM_TOGGLE_EDIT: {
      // change locally using getIn/setIn??
      const toggledId = itemReducer(state.get(action.payload.id), action);
      return state.set(action.payload.id, toggledId);
    }
    default:
      return state;
  }
};

export { itemsReducer };
