import { ItemFlags } from '../../models/ItemFlags';
import {
  ITEM_CHANGE_CANCELLED,
  ITEM_CHANGE_SAVED,
  ITEM_MAKE_EDITABLE,
} from '../../actions/actionTypes';

const defaultState = new ItemFlags();

export const itemFlagsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ITEM_MAKE_EDITABLE:
      return state.merge({
        isBeingEdited: true,
      });

    case ITEM_CHANGE_CANCELLED:
    case ITEM_CHANGE_SAVED:
      return state.merge({
        isBeingEdited: false,
      });

    default:
      return state;
  }
};
