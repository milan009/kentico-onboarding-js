import { ADD_ITEM, DELETE_ITEM } from '../actions/actionTypes';
import { IItemAction } from '../interfaces/IItemAction';
import { List } from 'immutable';

const list: List<string> = List<string>();
function itemsOrder (state: List<string> = list, action: IItemAction): List<string> {
  switch (action.type) {
    case ADD_ITEM:
      return state.push(action.payload.guid);
    case DELETE_ITEM:
      const index: number = state.indexOf(action.payload.guid);
      return state.splice(index, 1) as List<string>;
    default:
      return state;
  }
}

export { itemsOrder };
