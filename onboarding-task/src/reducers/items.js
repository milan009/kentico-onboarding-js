/**
 * Created by IvanJ on 13.2.2017.
 */
import { ADD_ITEM, TOGGLE_EDIT_MODE, DELETE_ITEM, UPDATE_ITEM } from '../actions/actionTypes.js';
import Immutable from 'immutable';
import item from './item';

const items = (state = Immutable.Map(), action) => {
  switch (action.type) {
    case ADD_ITEM: {
      return state.set(action.payload.guid, item(undefined, action));
    }
    case UPDATE_ITEM:
    case TOGGLE_EDIT_MODE: {
      const editedItem = state.get(action.payload.guid);
      return state.set(action.payload.guid, item(editedItem, action));
    }
    case DELETE_ITEM: {
      return state.delete(action.payload.guid);
    }
    default:
      return state;
  }
};

export default items;
