import {
  DELETE_ITEM_SUCCESS,
  GET_ITEMS_SUCCESS,
  POST_ITEM_SUCCESS,
  PUT_ITEM_SUCCESS,
} from '../../actions/actionTypes';
import { OrderedMap } from 'immutable';
import { IAction } from '../../actions/IAction';
import { Item } from '../../models/Item';
import { IItemServerModel } from '../../models/IItemServerModel';

const itemsByIdReducer = (state = OrderedMap<string, Item>(), action: IAction): OrderedMap<string, Item> => {
  switch (action.type) {
    case POST_ITEM_SUCCESS: {
      return state.set(action.payload.item.id, new Item({...action.payload.item}));
    }

    case PUT_ITEM_SUCCESS: {
      return state.set(action.payload.item.id, new Item({...action.payload.item}));
    }

    case DELETE_ITEM_SUCCESS: {
      return state.delete(action.payload.id);
    }

    case GET_ITEMS_SUCCESS: {
      const receivedItems = action.payload.items.map((val: IItemServerModel) => [val.id, new Item(val)]);
      return OrderedMap<string, Item>(receivedItems);
    }

    default: {
      return state;
    }
  }
};

export { itemsByIdReducer };
