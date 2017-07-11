import * as ActionTypes from '../actions/actionTypes';
import { ItemLocal } from '../models/ItemLocal';

const defaultState = new ItemLocal();

export const itemLocalReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ActionTypes.ITEM_MAKE_EDITABLE:
      return state.merge({
        isEdited: true,
      });
    case ActionTypes.ITEM_CHANGE_CANCELLED:
    case ActionTypes.ITEM_CHANGE_SAVED:
      return state.merge({
        isEdited: false,
      });

    default:
      return state;
  }
};
