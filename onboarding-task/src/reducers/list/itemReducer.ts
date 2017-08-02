import * as actionTypes from '../../actions/actionTypes';
import { IItemDataRecord, ItemData } from '../../models/ItemData';
import { IAction } from '../../actions/actionInterface';

const defaultState = new ItemData();

export const itemReducer = (state: IItemDataRecord = defaultState, action: IAction): IItemDataRecord => {
  switch (action.type) {
    case actionTypes.ITEM_CHANGE_SAVED:
      return new ItemData({
        id: action.payload.id,
        text: action.payload.text
      });

    default:
      return state;
  }
};
