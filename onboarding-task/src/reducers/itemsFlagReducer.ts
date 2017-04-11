import { Map } from 'immutable';

import { IAction } from '../actions/IAction';
import { CREATE_ITEM, DELETE_ITEM, EDIT_ITEM, TOGGLE_ITEM_VIEW_MODE } from '../actions/actionTypes';
import { ItemFlags } from '../models/ItemFlags';
import { itemFlagsReducer } from './itemFlagsReducer';

const itemsFlagReducer = (state = Map<string, ItemFlags>(),
                          action: IAction,) => {
  switch (action.type) {
    case EDIT_ITEM:
    case TOGGLE_ITEM_VIEW_MODE:
      return state.set(action.payload.id, itemFlagsReducer(state.get(action.payload.id), action));

    // case EDIT_ITEM:
    //   return state.set(action.payload.id, itemFlagsReducer(state.get(action.payload.id), action));

    case CREATE_ITEM:
      return state.set(action.payload.id, itemFlagsReducer(new ItemFlags(), action));

    case DELETE_ITEM:
      return state.delete(action.payload.id);

    default:
      return state;
  }
};

export { itemsFlagReducer };
