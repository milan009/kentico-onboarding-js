import {
  ITEM_CREATE,
  ITEM_DELETE,
  ITEM_UPDATE,
} from '../../actions/actionTypes';
import { Map } from 'immutable';
import { itemReducer } from './itemReducer';
import { IAction } from '../../interfaces/IAction';
import { Item } from '../../models/Item';

const itemsByIdReducer = (state = Map<string, Item>(), action: IAction): Map<string, Item> => {
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

    default: {
      return state;
    }
  }
};

export { itemsByIdReducer };
