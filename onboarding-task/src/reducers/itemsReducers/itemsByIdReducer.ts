import {
  DELETE_ITEM_SUCCESS,
  GET_ITEMS_SUCCESS,
  ITEM_CREATE,
  ITEM_DELETE,
  ITEM_UPDATE, POST_ITEM_SUCCESS, PUT_ITEM_SUCCESS,
} from '../../actions/actionTypes';
import { OrderedMap } from 'immutable';
import { itemReducer } from './itemReducer';
import { IAction } from '../../actions/IAction';
import { Item } from '../../models/Item';
import { IItem } from "../../models/IItem";

const itemsByIdReducer = (state = OrderedMap<string, Item>(), action: IAction): OrderedMap<string, Item> => {
  switch (action.type) {
    case ITEM_CREATE: {
      const newItem = itemReducer(undefined, action);
      return state.set(action.payload.id, newItem);
    }

    case ITEM_UPDATE: {
      const existingItem = state.get(action.payload.id);
      const updatedItem = itemReducer(existingItem, action);
      return state.set(action.payload.id, updatedItem);
    }

    case ITEM_DELETE: {
      return state.delete(action.payload.id);
    }

    case POST_ITEM_SUCCESS: {
      return state.set(action.payload.item.id, new Item({...action.payload.item}));
    }

    case PUT_ITEM_SUCCESS: {
      return state.mergeIn([action.payload.item.id], ...action.payload.item);
    }

    case DELETE_ITEM_SUCCESS: {
      return state.delete(action.payload.id);
    }

    case GET_ITEMS_SUCCESS: {
      const receivedItems = action.payload.items.map((val: IItem) => [val.id, new Item({...val})]);
      return state.merge(receivedItems);
    }

    default: {
      return state;
    }
  }
};

export { itemsByIdReducer };
