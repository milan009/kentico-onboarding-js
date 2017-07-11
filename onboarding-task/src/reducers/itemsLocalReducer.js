import * as ActionTypes from '../actions/actionTypes';
import { itemLocalReducer } from './itemLocalReducer';
import { ItemLocal } from '../models/ItemLocal';
import { OrderedMap } from 'immutable';

const defaultState = new OrderedMap();

export const itemsLocalReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ActionTypes.ITEM_CREATED: {
      const newItem = new ItemLocal({
        isEdited: false,
      });
      return state.set(action.payload.newId, newItem);
    }

    case ActionTypes.ITEM_MAKE_EDITABLE:
    case ActionTypes.ITEM_CHANGE_CANCELLED:
    case ActionTypes.ITEM_CHANGE_SAVED: {
      const localToEdit = state.get(action.payload.id);
      const editedLocal = itemLocalReducer(localToEdit, action);
      return state.set(action.payload.id, editedLocal);
    }

    default:
      return state;
  }
};
