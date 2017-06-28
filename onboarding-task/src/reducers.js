/**
 * Created by MilanJ on 28.6.2017.
 */

import { OrderedMap } from 'immutable';
import { uuidV4 } from 'uuid';
import * as ActionTypes from './actionTypes';
import { ItemRecord } from './ItemRecord';

const addItemReducer = (state = new OrderedMap(), action) => {
  switch (action.type) {
    case ActionTypes.ITEM_CREATED: {
      const newItem = new ItemRecord(uuidV4(), action.text);
      return state.set(newItem.id, newItem);
    }
    default:
      return state;
  }
};

const deleteItemReducer = (state = new OrderedMap(), action) => {
  switch (action.type) {
    case ActionTypes.ITEM_DELETED: {
      return state.remove(action.id);
    }
    default:
      return state;
  }
};

const changeItemReducer = (state = new OrderedMap(), action) => {
  switch (action.type) {
    case ActionTypes.MAKE_EDITABLE: {
      return state.set(action.id,
        new ItemRecord(
          action.id,
          action.text,
          true
        ));
    }
    case ActionTypes.CHANGE_CANCELLED: {
      return state.set(action.id,
        new ItemRecord(
          action.id,
          action.text,
        ));
    }
    case ActionTypes.CHANGE_SAVED: {
      return state.set(action.id,
        new ItemRecord(
          action.id,
          action.text,
        ));
    }
    default:
      return state;
  }
};

export { addItemReducer, deleteItemReducer, changeItemReducer };
