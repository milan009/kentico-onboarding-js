import { OrderedMap } from 'immutable';

import { ItemData } from '../../models/ItemData';
import { IAction } from '../../actions/actionInterface';
import * as actionTypes from '../../actions/actionTypes';
import { itemReducer } from './itemReducer';

export type ItemsDataMap = OrderedMap<string, ItemData>;

const defaultState = OrderedMap<string, ItemData>();

export const itemsReducer = (state: ItemsDataMap = defaultState, action: IAction): ItemsDataMap => {
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
