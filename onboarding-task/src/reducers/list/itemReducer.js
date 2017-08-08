import { ItemData } from '../../models/ItemData';
import { ITEM_CHANGE_SAVED } from '../../actions/actionTypes';

const defaultState = new ItemData();

export const itemReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ITEM_CHANGE_SAVED:
      return state.merge({
        text: action.payload.text,
      });

    default:
      return state;
  }
};
