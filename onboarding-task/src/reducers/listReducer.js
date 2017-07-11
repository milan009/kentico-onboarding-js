import * as ActionTypes from '../actions/actionTypes';
import { itemsReducer } from './itemsReducer';
import { OrderedMap } from 'immutable';

const defaultState = {
  items: new OrderedMap(),
};

export const listReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ActionTypes.ITEM_CHANGE_SAVED:
    case ActionTypes.ITEM_CHANGE_CANCELLED:
    case ActionTypes.ITEM_CREATED:
    case ActionTypes.ITEM_DELETED:
    case ActionTypes.ITEM_MAKE_EDITABLE:
      return {
        ...state,
        items: itemsReducer(state.items, action),
      };
    default:
      return state;
  }
};
