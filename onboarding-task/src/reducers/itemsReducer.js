import * as ActionTypes from '../actions/actionTypes';
import { itemReducer } from './itemReducer';
import { OrderedMap } from 'immutable';
import { Item } from '../models/Item';
import uuidV4 from 'uuid';

const defaultState = new OrderedMap();

export const itemsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ActionTypes.ITEM_DELETED:
      return state.remove(action.payload.id);

    case ActionTypes.ITEM_CREATED: {
      const newItem = new Item({
        id: uuidV4(),
        text: action.payload.text,
      });
      return state.set(newItem.id, newItem);
    }

    case ActionTypes.ITEM_MAKE_EDITABLE:
    case ActionTypes.ITEM_CHANGE_CANCELLED:
    case ActionTypes.ITEM_CHANGE_SAVED: {
      const itemToEdit = state.get(action.payload.id);
      const editedItem = itemReducer(itemToEdit, action);
      return state.set(editedItem.id, editedItem);
    }

    default:
      return state;
  }
};
