import { OrderedMap } from 'immutable';
import { DELETE_ITEM, FETCH_ITEMS_RECEIVE, UPDATE_ITEM, POST_ITEM_RECEIVE } from '../actions/actionTypes';
import { IAction } from '../actions/IAction';
import { Item } from '../models/Item';
import {IItemResponse} from '../models/IItemResponse';

const items = (state = OrderedMap(), action: IAction) => {
  switch (action.type) {
    case FETCH_ITEMS_RECEIVE:
      const receivedItems: IItemResponse[] = action.payload.items;
      return OrderedMap (
        receivedItems.map((item: IItemResponse) => [item.id, new Item({id: item.id, text: item.text})])
      );

    case POST_ITEM_RECEIVE:
      const receivedItem: IItemResponse = action.payload.item;
      return state.set(receivedItem.id, new Item({id: receivedItem.id, text: receivedItem.text}));

    case DELETE_ITEM:
      return state.delete(action.payload.id);

    case UPDATE_ITEM:
      return state.updateIn([action.payload.id], item => {
        return item.set('text', action.payload.text);
      });

    default:
      return state;
  }
};

export { items };
