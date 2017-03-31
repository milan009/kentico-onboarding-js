import { OrderedSet } from 'immutable';
import { DELETE_ITEM, FETCH_ITEMS_RECEIVE, POST_ITEM_RECEIVE } from '../actions/actionTypes';
import { IAction } from '../actions/IAction';

const itemsOrder = (state = OrderedSet(), action: IAction) => {
  switch (action.type) {
    case FETCH_ITEMS_RECEIVE:
      return OrderedSet(
        action.payload.items.map((item: any) => item.id)
      );

    case POST_ITEM_RECEIVE:
      return state.add(action.payload.item.id);

    case DELETE_ITEM:
      return state.delete(action.payload.id);

    default:
      return state;
  }
};

export { itemsOrder };
