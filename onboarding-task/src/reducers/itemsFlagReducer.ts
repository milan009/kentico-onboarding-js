import {Map} from 'immutable';

import {ITEM_CREATED, ITEM_DELETED, ITEM_VIEW_MODE_TOGGLED} from '../actions/actionTypes';
import {ItemFlags} from '../models/ItemFlags';
import {IAction} from '../actions/IAction';


const itemsFlagReducer = (
  state: Map<string, ItemFlags> = Map<string, ItemFlags>(),
  action: IAction,
) => {
  switch (action.type) {
    case ITEM_VIEW_MODE_TOGGLED:
      const newEditModeFlag = !state.get(action.payload.id).editMode;
      return state.setIn([action.payload.id, 'editMode'], newEditModeFlag);

    case ITEM_DELETED:
      return state.delete(action.payload.id);

    case ITEM_CREATED:
      const newItemFlags = new ItemFlags({
        id: action.payload.id,
        editMode: false
      });
      return state.set(action.payload.id, newItemFlags);

    default:
      return state;
  }
};

export { itemsFlagReducer };
