import { ADD_ITEM, DELETE_ITEM, TOGGLE_EDIT_MODE, UPDATE_ITEM_TEXT } from '../actions/actionTypes';
import * as Immutable from 'immutable';
import {IItemAction} from '../actions/actionCreators';
import { Map } from 'immutable';

const map = Immutable.Map(['', {'isEdited': false }]);
const itemsFlags = (state: Map<any, any> = map, action: IItemAction) => {
  switch (action.type) {
    case ADD_ITEM: return state.set(action.payload.guid, { isEdited: false });
    case DELETE_ITEM: return state.delete(action.payload.guid);
    case UPDATE_ITEM_TEXT:
    case TOGGLE_EDIT_MODE: return state.set(action.payload.guid, {'isEdited': !state.get(action.payload.guid).isEdited});
    default: return state;
  }
};



export { itemsFlags };
