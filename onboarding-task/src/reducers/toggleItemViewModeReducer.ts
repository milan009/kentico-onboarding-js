import * as Immutable from 'immutable';

import {ITEM_VIEW_MODE_TOGGLED} from '../actions/actionTypes';
import {ItemFlags} from '../models/ItemFlags';


const toggleItemViewModeReducer = (state: Immutable.Map<string, ItemFlags>, action: any) => {
  switch (action.type) {
    case ITEM_VIEW_MODE_TOGGLED:
      return state.setIn([action.id, 'editMode'], state.get(action.id).editMode);
    default:
      return state;
  }
};

export { toggleItemViewModeReducer };
