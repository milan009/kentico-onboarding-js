import * as ActionTypes from '../actions/actionTypes';
import { Item } from '../models/Item';

const defaultState = new Item();

const itemReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ActionTypes.ITEM_MAKE_EDITABLE:
      return state.merge({ isEdited: true });

    case ActionTypes.ITEM_CHANGE_CANCELLED:
      return state.merge({ isEdited: false });

    case ActionTypes.ITEM_CHANGE_SAVED:
      return state.merge({
        text: action.payload.text,
        isEdited: false,
      });

    default:
      return state;
  }
};

export {
  itemReducer,
};
