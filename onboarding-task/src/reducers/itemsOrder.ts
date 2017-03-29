import { OrderedSet } from 'immutable';
import { ADD_ITEM, DELETE_ITEM, FETCH_ITEMS_RECEIVE } from '../actions/actionTypes';
import { IAction } from '../actions/IAction';

const itemsOrder = (state = OrderedSet(), action: IAction) => {
  switch (action.type) {
    case FETCH_ITEMS_RECEIVE:
      return OrderedSet(
        action.payload.items.map((item: any) => item.id)
      );
    case ADD_ITEM:
      return state.add(action.payload.item.id);

    case DELETE_ITEM:
      return state.delete(action.payload.id);

    default:
      return state;
  }
};

export { itemsOrder };
