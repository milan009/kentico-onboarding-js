import * as actionTypes from '../../actions/actionTypes.ts';
import { ItemFlags } from '../../models/ItemFlags.ts';

const defaultState = new ItemFlags();

export const itemFlagsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.ITEM_MAKE_EDITABLE:
      return state.merge({
        isBeingEdited: true,
      });
    case actionTypes.ITEM_CHANGE_CANCELLED:
    case actionTypes.ITEM_CHANGE_SAVED:
      return state.merge({
        isBeingEdited: false,
      });

    default:
      return state;
  }
};
