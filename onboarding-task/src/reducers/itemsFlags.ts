import {
  DELETE_ITEM,
  FETCH_ITEMS_SUCCESS,
  POST_ITEM_SUCCESS,
  TOGGLE_EDIT_MODE,
  UPDATE_ITEM_TEXT
} from '../actions/actionTypes';
import * as Immutable from 'immutable';
import { IAction } from '../actions/IAction';
import { Map } from 'immutable';
import { IItemServerModel } from '../models/IItemServerModel';

export interface IItemFlags {
  isEdited: boolean;
}

const emptyItemsFlags = Immutable.Map<string, IItemFlags>();
function itemsFlags (state: Map<string, IItemFlags> = emptyItemsFlags, action: IAction): Map<string, IItemFlags> {
  switch (action.type) {
    case DELETE_ITEM:
      return state.delete(action.payload.guid);

    case UPDATE_ITEM_TEXT:
    case TOGGLE_EDIT_MODE:
      const stateBefore = state.get(action.payload.guid);
      return state.set(action.payload.guid, { isEdited: !stateBefore.isEdited });

    case FETCH_ITEMS_SUCCESS:
      const items = action.payload.items;
      const mapObject = items.reduce((accu: any, currentItem: IItemServerModel) => {
        accu[currentItem.id] = { isEdited: false };
        return accu;
      }, {});
      return Map<string, IItemFlags>(mapObject);

    case POST_ITEM_SUCCESS:
      return state.set(action.payload.item.id, { isEdited: false });
    default:
      return state;
  }
}

export { itemsFlags };
