import { ADD_ITEM, DELETE_ITEM, UPDATE_ITEM_TEXT } from '../actions/actionTypes';
import * as Immutable from 'immutable';
import { item } from './item';
import {IItemAction} from '../actions/actionCreators';

const map = Immutable.Map();
const itemsById = (state = map, action: IItemAction) => {
  switch (action.type) {
    case ADD_ITEM: return state.set(action.payload.guid, item(undefined, action));
    case UPDATE_ITEM_TEXT: const editedItem = state.get(action.payload.guid);
      return state.set(action.payload.guid, item(editedItem, action));
    case DELETE_ITEM: return state.delete(action.payload.guid);
    default: return state;
  }
};

export { itemsById };
