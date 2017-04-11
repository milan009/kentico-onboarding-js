import { DELETE_ITEM, UPDATE_ITEM_TEXT, FETCH_ITEMS_SUCCESS, POST_ITEM_SUCCESS } from '../actions/actionTypes';
import { item } from './item';
import { IAction } from '../actions/IAction';
import { Map } from 'immutable';
import { ItemRecord } from '../models/ItemRecord';
import { IItemServerModel } from '../models/IItemServerModel';

const emptyItemsById = Map<string, ItemRecord>();
function itemsById (state = emptyItemsById, action: IAction): Map<string, ItemRecord> {
  switch (action.type) {
    case UPDATE_ITEM_TEXT:
      const editedItem: ItemRecord = state.get(action.payload.guid);
      return state.set(action.payload.guid, item(editedItem, action));

    case DELETE_ITEM:
      return state.delete(action.payload.guid);

    case FETCH_ITEMS_SUCCESS:
      const items = action.payload.items;
      const mapObject = items.reduce((accu: any, currentItem: IItemServerModel) => {
        accu[currentItem.id] = new ItemRecord({ guid: currentItem.id, text: currentItem.text });
        return accu;
      }, {});
      const result = Map<string, ItemRecord>(mapObject);
      return result;

    case POST_ITEM_SUCCESS:
      return state.set(action.payload.item.id, item(undefined, action));
    default:
      return state;
  }
}

export { itemsById };
