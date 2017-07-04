/**
 * Created by MilanJ on 28.6.2017.
 */

import { OrderedMap } from 'immutable';
import uuidV4 from 'uuid';
import * as ActionTypes from '../actionTypes';
import { Item } from '../models/Item';

const itemsReducer = (state = new OrderedMap(), action) => {
  switch (action.type) {
    case ActionTypes.ITEM_DELETED:
      return state.remove(action.id);

    case ActionTypes.ITEM_CREATED: {
      const newItem = new Item({
        id: uuidV4(),
        text: action.text,
      });
      return state.set(newItem.id, newItem);
    }

    case ActionTypes.MAKE_EDITABLE:
    case ActionTypes.CHANGE_CANCELLED:
    case ActionTypes.CHANGE_SAVED: {
      return state.mergeIn(
        [action.id],
        itemReducer(state.get(action.id), action)
      );
    }

    default:
      return state;
  }
};

const itemReducer = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.MAKE_EDITABLE:
      return { isEdited: true };

    case ActionTypes.CHANGE_CANCELLED:
      return { isEdited: false };

    case ActionTypes.CHANGE_SAVED:
      return {
        text: action.text,
        isEdited: false,
      };

    default:
      return state;
  }
};

export {
  itemsReducer,
};
