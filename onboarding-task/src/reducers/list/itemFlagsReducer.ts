import * as actionTypes from '../../actions/actionTypes';
import { IItemFlagsRecord, ItemFlags } from '../../models/ItemFlags';
import { IAction } from '../../actions/actionInterface';

const defaultState = new ItemFlags();

export const itemFlagsReducer = (state: IItemFlagsRecord = defaultState, action: IAction): IItemFlagsRecord => {
  switch (action.type) {
    case actionTypes.ITEM_MAKE_EDITABLE:
      return new ItemFlags({
        isBeingEdited: true,
      });
    case actionTypes.ITEM_CHANGE_CANCELLED:
    case actionTypes.ITEM_CHANGE_SAVED:
      return new ItemFlags({
        isBeingEdited: false,
      });

    default:
      return state;
  }
};
