import { OrderedMap } from 'immutable';

import * as actionTypes from '../../actions/actionTypes';
import { itemReducer } from './itemReducer';
import { IItemDataRecord, ItemData } from '../../models/ItemData';
import { IAction } from '../../actions/actionInterface';

const defaultState = OrderedMap<string, IItemDataRecord>();

export const itemsReducer = (state: OrderedMap<string, IItemDataRecord> = defaultState, action: IAction) => {
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