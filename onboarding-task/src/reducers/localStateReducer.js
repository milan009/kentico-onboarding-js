import * as ActionTypes from '../actions/actionTypes';
import { itemsLocalReducer } from './itemsLocalReducer';
import { OrderedMap } from 'immutable';

const defaultState = {
  listItemsLocal: new OrderedMap(),
};

export const localStateReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ActionTypes.ITEM_CREATED:
    case ActionTypes.ITEM_CHANGE_SAVED:
    case ActionTypes.ITEM_CHANGE_CANCELLED:
    case ActionTypes.ITEM_MAKE_EDITABLE:
      return {
        ...state,
        itemsLocal: itemsLocalReducer(state.itemsLocal, action),
      };
    default:
      return state;
  }
};
