/**
 * Created by MilanJ on 28.6.2017.
 */

import { OrderedMap } from 'immutable';
import uuidV4 from 'uuid';
import * as ActionTypes from './actionTypes';
import { Item } from './models/Item';

const addItemReducer = (state = new OrderedMap(), action) => {
  switch (action.type) {
    case ActionTypes.ITEM_CREATED: {
      const newItem = new Item({
        id: uuidV4(),
        text: action.text,
      });

      return state.set(newItem.id, newItem);
    }

    default:
      return state;
  }
};

const deleteItemReducer = (state = new OrderedMap(), action) => {
  switch (action.type) {
    case ActionTypes.ITEM_DELETED:
      return state.remove(action.id);

    default:
      return state;
  }
};

const changeItemReducer = (state = new OrderedMap(), action) => {
  switch (action.type) {
    case ActionTypes.MAKE_EDITABLE:
      return state.set(action.id,
        new Item({
          id: action.id,
          text: action.text,
          isEdited: true,
        }));

    case ActionTypes.CHANGE_CANCELLED:
      return state.set(action.id,
        new Item({
          id: action.id,
          text: action.text,
        }));

    case ActionTypes.CHANGE_SAVED:
      return state.set(action.id,
        new Item({
          id: action.id,
          text: action.text,
        }));

    default:
      return state;
  }
};

export {
  addItemReducer,
  deleteItemReducer,
  changeItemReducer,
};
