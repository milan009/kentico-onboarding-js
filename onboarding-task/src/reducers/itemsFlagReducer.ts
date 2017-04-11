import { Map } from 'immutable';

import { IAction } from '../actions/IAction';
import { CREATE_ITEM, DELETE_ITEM, EDIT_ITEM, TOGGLE_ITEM_VIEW_MODE } from '../actions/actionTypes';
import { ItemFlags } from '../models/ItemFlags';

const itemsFlagReducer = (state = Map<string, ItemFlags>(),
                          action: IAction,) => {
  switch (action.type) {
    case TOGGLE_ITEM_VIEW_MODE:
      const newEditModeFlag = !state.get(action.payload.id).editMode;
      return state.setIn([action.payload.id, 'editMode'], newEditModeFlag);

    case DELETE_ITEM:
      return state.delete(action.payload.id);

    case CREATE_ITEM:
      const newItemFlags = new ItemFlags({
        id: action.payload.id,
        editMode: false
      });
      return state.set(action.payload.id, newItemFlags);

    case EDIT_ITEM:
      return state.setIn([action.payload.id, 'editMode'], false);

    default:
      return state;
  }
};

export { itemsFlagReducer };
