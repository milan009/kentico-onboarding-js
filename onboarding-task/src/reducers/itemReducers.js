import { OrderedMap } from 'immutable';
import uuidV4 from 'uuid';
import * as ActionTypes from '../actions/actionTypes';
import { Item } from '../models/Item';

const itemsReducer = (state = new OrderedMap(), action) => {
  switch (action.type) {
    case ActionTypes.ITEM_DELETED:
      return state.remove(action.payload.id);

    case ActionTypes.ITEM_CREATED: {
      const newItem = new Item({
        id: uuidV4(),
        text: action.payload.text,
      });
      return state.set(newItem.id, newItem);
    }

    case ActionTypes.ITEM_MAKE_EDITABLE:
    case ActionTypes.ITEM_CHANGE_CANCELLED:
    case ActionTypes.ITEM_CHANGE_SAVED: {
      return state.mergeIn(
        [action.payload.id],
        itemReducer(state.get(action.payload.id), action)
      );
    }

    default:
      return state;
  }
};

const itemReducer = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.ITEM_MAKE_EDITABLE:
      return { isEdited: true };

    case ActionTypes.ITEM_CHANGE_CANCELLED:
      return { isEdited: false };

    case ActionTypes.ITEM_CHANGE_SAVED:
      return {
        text: action.payload.text,
        isEdited: false,
      };

    default:
      return state;
  }
};

export {
  itemsReducer,
};
