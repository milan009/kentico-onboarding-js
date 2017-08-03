import * as actionTypes from '../../actions/actionTypes';
import { ItemFlags} from '../../models/ItemFlags';
import { IAction } from '../../actions/actionInterface';

export const itemFlagsReducer = (state: ItemFlags, action: IAction) => {
  switch (action.type) {
    case actionTypes.ITEM_MAKE_EDITABLE:
      return state.typedMerge({isBeingEdited: true});
    case actionTypes.ITEM_CHANGE_CANCELLED:
    case actionTypes.ITEM_CHANGE_SAVED:
      return state.typedMerge({isBeingEdited: false});

    default:
      return state;
  }
};
