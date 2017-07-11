import * as ActionTypes from '../actions/actionTypes';
import { listReducer } from './listReducer';
import { OrderedMap } from 'immutable';

const defaultState = {
  listState: {
    items: new OrderedMap(),
  },
};

export const appReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ActionTypes.ITEM_CHANGE_SAVED:
    case ActionTypes.ITEM_CHANGE_CANCELLED:
    case ActionTypes.ITEM_CREATED:
    case ActionTypes.ITEM_DELETED:
    case ActionTypes.ITEM_MAKE_EDITABLE:
      return {
        ...state,
        listState: listReducer(state.listState, action),
      };
    default:
      return state;
  }
};
