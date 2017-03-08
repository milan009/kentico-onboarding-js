import { ADD_ITEM, DELETE_ITEM, UPDATE_ITEM_TEXT } from '../actions/actionTypes';
import { item } from './item';
import { IItemAction } from '../interfaces/IItemAction';
import { Map } from 'immutable';
import { IItemRecord } from '../interfaces/IItemRecord';

const map: Map<string, IItemRecord> = Map<string, IItemRecord>();
function itemsById (state: Map<string, IItemRecord> = map, action: IItemAction): Map<string, IItemRecord> {
  switch (action.type) {
    case ADD_ITEM:
      return state.set(action.payload.guid, item(undefined, action));
    case UPDATE_ITEM_TEXT:
      const editedItem = state.get(action.payload.guid);
      return state.set(action.payload.guid, item(editedItem, action));
    case DELETE_ITEM:
      return state.delete(action.payload.guid);
    default: return state;
  }
}

export { itemsById };
