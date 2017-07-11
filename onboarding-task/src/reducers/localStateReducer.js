import * as ActionTypes from '../actions/actionTypes';
import { itemInfosReducer } from './itemInfosReducer';
import { OrderedMap } from 'immutable';

const defaultState = {
  itemInfos: new OrderedMap(),
};

export const localStateReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ActionTypes.ITEM_CREATED:
    case ActionTypes.ITEM_CHANGE_SAVED:
    case ActionTypes.ITEM_CHANGE_CANCELLED:
    case ActionTypes.ITEM_MAKE_EDITABLE:
      return {
        ...state,
        itemInfos: itemInfosReducer(state.itemInfos, action),
      };
    default:
      return state;
  }
};
