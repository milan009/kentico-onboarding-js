import { IAction } from '../../actions/actionInterface';
import { ItemData } from '../../models/ItemData';
import * as actionTypes from '../../actions/actionTypes';

const defaultState = new ItemData();

export const itemReducer = (state: ItemData = defaultState, action: IAction): ItemData => {
  switch (action.type) {
    case actionTypes.ITEM_CHANGE_SAVED:
      return state.typedMerge({ text: action.payload.text });

    default:
      return state;
  }
};
