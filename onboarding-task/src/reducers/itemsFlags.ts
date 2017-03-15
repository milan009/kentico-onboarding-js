import { ADD_ITEM, DELETE_ITEM, TOGGLE_EDIT_MODE, UPDATE_ITEM_TEXT } from '../actions/actionTypes';
import * as Immutable from 'immutable';
import { IItemAction } from '../actions/IItemAction';
import { Map } from 'immutable';

export interface IItemFlags {
  isEdited: boolean;
}

const emptyItemsFlags = Immutable.Map<string, IItemFlags>();
function itemsFlags (state: Map<string, IItemFlags> = emptyItemsFlags, action: IItemAction): Map<string, IItemFlags> {
  switch (action.type) {
    case ADD_ITEM:
      return state.set(action.payload.guid, { isEdited: false });

    case DELETE_ITEM:
      return state.delete(action.payload.guid);

    case UPDATE_ITEM_TEXT:
    case TOGGLE_EDIT_MODE:
      const stateBefore = state.get(action.payload.guid);
      return state.set(action.payload.guid, { isEdited: !stateBefore.isEdited });

    default:
      return state;
  }
}

export { itemsFlags };
