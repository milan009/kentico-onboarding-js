import { ADD_ITEM, DELETE_ITEM, UPDATE_ITEM_TEXT } from '../actions/actionTypes';
import { item } from './item';
import { IItemAction } from '../actions/IItemAction';
import { Map } from 'immutable';
import {ItemRecord} from "../utils/itemRecord";

const emptyItemsById = Map<string, ItemRecord>();
function itemsById (state = emptyItemsById, action: IItemAction): Map<string, ItemRecord> {
  switch (action.type) {
    case ADD_ITEM:
      return state.set(action.payload.guid, item(undefined, action));

    case UPDATE_ITEM_TEXT:
      const editedItem: ItemRecord = state.get(action.payload.guid);
      return state.set(action.payload.guid, item(editedItem, action));

    case DELETE_ITEM:
      return state.delete(action.payload.guid);

    default:
      return state;
  }
}

export { itemsById };
