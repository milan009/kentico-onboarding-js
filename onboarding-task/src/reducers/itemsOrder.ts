import { ADD_ITEM, DELETE_ITEM } from '../actions/actionTypes';
import { IAction } from '../actions/IAction';
import { OrderedSet } from 'immutable';

const emptyItemsOrder = OrderedSet<string>();
function itemsOrder (state: OrderedSet<string> = emptyItemsOrder, action: IAction): OrderedSet<string> {
  switch (action.type) {
    case ADD_ITEM:
      return state.add(action.payload.guid);

    case DELETE_ITEM:
      return state.remove(action.payload.guid);

    default:
      return state;
  }
}

export { itemsOrder };
