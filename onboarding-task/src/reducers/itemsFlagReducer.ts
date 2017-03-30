import * as Immutable from 'immutable';

import {ITEM_CREATED, ITEM_DELETED, ITEM_VIEW_MODE_TOGGLED} from '../actions/actionTypes';
import {ItemFlags} from '../models/ItemFlags';


const itemsFlagReducer = (state: Immutable.Map<string, ItemFlags>, action: any) => {
  if (typeof state === 'undefined') {
    state = Immutable.Map<string, ItemFlags>();
  }
  switch (action.type) {
    case ITEM_VIEW_MODE_TOGGLED:
      const newEditModeFlag = !state.get(action.id).editMode;
      return state.setIn([action.id, 'editMode'], newEditModeFlag);

    case ITEM_DELETED:
      return state.delete(action.id);

    case ITEM_CREATED:
      const newItemFlags = new ItemFlags({
        id: action.id,
        editMode: false
      });
      return state.set(action.id, newItemFlags);

    default:
      return state;
  }
};

export { itemsFlagReducer };
