import { ADD_ITEM, DELETE_ITEM } from '../actions/actionTypes';
import { IItemAction } from '../actions/IItemAction';
import { OrderedSet } from 'immutable';

const emptyItemsOrder = OrderedSet<string>();
function itemsOrder (state: OrderedSet<string> = emptyItemsOrder, action: IItemAction): OrderedSet<string> {
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
