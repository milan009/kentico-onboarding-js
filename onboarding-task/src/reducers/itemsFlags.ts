import { ADD_ITEM, DELETE_ITEM, TOGGLE_EDIT_MODE, UPDATE_ITEM_TEXT } from '../actions/actionTypes';
import * as Immutable from 'immutable';
import { IItemAction } from '../interfaces/IItemAction';
import { Map } from 'immutable';
import { IItemFlags } from '../interfaces/IItemFlags';

const map: Map<string, IItemFlags> = Immutable.Map<string, IItemFlags>();
function itemsFlags (state: Map<string, IItemFlags> = map, action: IItemAction): Map<string, IItemFlags> {
  switch (action.type) {
    case ADD_ITEM:
      return state.set(action.payload.guid, { isEdited: false });
    case DELETE_ITEM:
      return state.delete(action.payload.guid);
    case UPDATE_ITEM_TEXT:
    case TOGGLE_EDIT_MODE:
      return state.set(action.payload.guid, { isEdited: !state.get(action.payload.guid).isEdited });
    default:
      return state;
  }
}

export { itemsFlags };
