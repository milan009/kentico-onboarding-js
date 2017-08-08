import { OrderedMap } from 'immutable';

import { itemReducer } from './itemReducer';
import { ItemData } from '../../models/ItemData';
import {
  ITEM_CHANGE_SAVED,
  ITEM_CREATED,
  ITEM_DELETED,
} from '../../actions/actionTypes';

const defaultState = new OrderedMap();

export const itemsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ITEM_DELETED:
      return state.remove(action.payload.id);

    case ITEM_CREATED: {
      const newItem = new ItemData({
        id: action.payload.newId,
        text: action.payload.text,
      });
      return state.set(action.payload.newId, newItem);
    }

    case ITEM_CHANGE_SAVED: {
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
