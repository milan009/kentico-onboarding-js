import * as ActionTypes from '../../actions/actionTypes';
import { ItemData } from '../../models/ItemData';

const defaultState = new ItemData();

export const itemReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ActionTypes.ITEM_CHANGE_SAVED:
      return state.merge({
        text: action.payload.text,
      });

    default:
      return state;
  }
};
