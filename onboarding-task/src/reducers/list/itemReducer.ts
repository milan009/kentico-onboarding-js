import * as actionTypes from '../../actions/actionTypes';
import { IAction } from '../../actions/actionInterface';
import { ItemData } from '../../models/ItemData';

export const itemReducer = (state: ItemData, action: IAction) => {
  switch (action.type) {
    case actionTypes.ITEM_CHANGE_SAVED:
      return state.typedMerge({ text: action.payload.text });

    default:
      return state;
  }
};
