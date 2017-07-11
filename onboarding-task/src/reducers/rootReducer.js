import * as ActionTypes from '../actions/actionTypes';
import { appReducer } from './appReducer';
import { OrderedMap } from 'immutable';

const defaultState = {
  appState: {
    listState: {
      items: new OrderedMap(),
    },
    localState: {
      itemInfos: new OrderedMap(),
    },
  },
};

export const rootReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ActionTypes.ITEM_CHANGE_SAVED:
    case ActionTypes.ITEM_CHANGE_CANCELLED:
    case ActionTypes.ITEM_CREATED:
    case ActionTypes.ITEM_DELETED:
    case ActionTypes.ITEM_MAKE_EDITABLE:
      return {
        ...state,
        appState: appReducer(state.appState, action),
      };
    default:
      return state;
  }
};
