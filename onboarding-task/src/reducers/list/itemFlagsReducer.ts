import { ItemFlags} from '../../models/ItemFlags';
import { IAction } from '../../actions/actionInterface';
import * as actionTypes from '../../actions/actionTypes';

const defaultState = new ItemFlags();

export const itemFlagsReducer = (state: ItemFlags = defaultState, action: IAction): ItemFlags => {
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
