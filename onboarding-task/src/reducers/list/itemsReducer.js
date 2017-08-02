import { OrderedMap } from 'immutable';

import * as actionTypes from '../../actions/actionTypes.ts';
import { itemReducer } from './itemReducer';
import { ItemData } from '../../models/ItemData';

const defaultState = new OrderedMap();

export const itemsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.ITEM_DELETED:
      return state.remove(action.payload.id);

    case actionTypes.ITEM_CREATED: {
      const newItem = new ItemData({
        id: action.payload.newId,
        text: action.payload.text,
      });
      return state.set(action.payload.newId, newItem);
    }

    case actionTypes.ITEM_CHANGE_SAVED: {
      const itemToEdit = state.get(action.payload.id);

      if (!itemToEdit) {
        return state;
      }

      const editedItem = itemReducer(itemToEdit, action);
      return state.set(action.payload.id, editedItem);
    }

    default:
      return state;
  }
};
