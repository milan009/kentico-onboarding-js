import * as ActionTypes from '../actions/actionTypes';
import { ItemInfo } from '../models/ItemInfo';

const defaultState = new ItemInfo();

export const itemInfoReducer = (state = defaultState, action) => {
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
