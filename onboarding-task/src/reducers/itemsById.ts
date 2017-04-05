import { ADD_ITEM, DELETE_ITEM, UPDATE_ITEM_TEXT, FETCH_ITEMS_SUCCESS } from '../actions/actionTypes';
import { item } from './item';
import { IAction } from '../actions/IAction';
import { Map } from 'immutable';
import {ItemRecord} from '../models/ItemRecord';
import {IItemServerModel} from '../models/IItemServerModel';

const emptyItemsById = Map<string, ItemRecord>();
function itemsById (state = emptyItemsById, action: IAction): Map<string, ItemRecord> {
  switch (action.type) {
    case ADD_ITEM:
      return state.set(action.payload.guid, item(undefined, action));

    case UPDATE_ITEM_TEXT:
      const editedItem: ItemRecord = state.get(action.payload.guid);
      return state.set(action.payload.guid, item(editedItem, action));

    case DELETE_ITEM:
      return state.delete(action.payload.guid);

    case FETCH_ITEMS_SUCCESS:
      debugger;
        const newState = Map<string, ItemRecord>();
        const items = action.payload.items;
        console.log(items);
        items.map((currentItem: IItemServerModel) => {
          newState.set(currentItem.id, new ItemRecord({guid: currentItem.id, text: currentItem.text}))
        });
        console.log(newState);
      return newState;
    default:
      return state;
  }
}

export { itemsById };
