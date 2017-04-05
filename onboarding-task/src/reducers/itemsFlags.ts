import {ADD_ITEM, DELETE_ITEM, FETCH_ITEMS_SUCCESS, TOGGLE_EDIT_MODE, UPDATE_ITEM_TEXT} from '../actions/actionTypes';
import * as Immutable from 'immutable';
import { IAction } from '../actions/IAction';
import { Map } from 'immutable';
import {IItemServerModel} from '../models/IItemServerModel';

export interface IItemFlags {
  isEdited: boolean;
}

const emptyItemsFlags = Immutable.Map<string, IItemFlags>();
function itemsFlags (state: Map<string, IItemFlags> = emptyItemsFlags, action: IAction): Map<string, IItemFlags> {
  switch (action.type) {
    case ADD_ITEM:
      return state.set(action.payload.guid, { isEdited: false });

    case DELETE_ITEM:
      return state.delete(action.payload.guid);

    case UPDATE_ITEM_TEXT:
    case TOGGLE_EDIT_MODE:
      const stateBefore = state.get(action.payload.guid);
      return state.set(action.payload.guid, { isEdited: !stateBefore.isEdited });

    case FETCH_ITEMS_SUCCESS:
      debugger;
      const newState = Immutable.Map<string, IItemFlags>();
      action.payload.items.map(
        (currentItem: IItemServerModel) =>
          newState.set(currentItem.id, { isEdited: false }));
      return newState;

    default:
      return state;
  }
}

export { itemsFlags };
