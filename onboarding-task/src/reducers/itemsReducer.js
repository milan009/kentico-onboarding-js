import * as ActionTypes from '../actions/actionTypes';
import { itemReducer } from './itemReducer';
import { OrderedMap } from 'immutable';
import { ItemData } from '../models/ItemData';

const defaultState = new OrderedMap();

export const itemsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ActionTypes.ITEM_DELETED:
      return state.remove(action.payload.id);

    case ActionTypes.ITEM_CREATED: {
      const newItem = new ItemData({
        text: action.payload.text,
      });
      return state.set(action.payload.newId, newItem);
    }

    case ActionTypes.ITEM_CHANGE_SAVED: {
      const itemToEdit = state.get(action.payload.id);
      const editedItem = itemReducer(itemToEdit, action);
      return state.set(action.payload.id, editedItem);
    }

    default:
      return state;
  }
};
