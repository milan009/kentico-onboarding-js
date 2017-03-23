import * as Immutable from 'immutable';

import {ITEM_VIEW_MODE_TOGGLED} from '../actions/actionTypes';
import {ItemFlags} from '../models/ItemFlags';


const itemFlagReducer = (state: Immutable.Map<string, ItemFlags>, action: any) => {
  switch (action.type) {
    case ITEM_VIEW_MODE_TOGGLED:
      const newEditModeFlag = !state.get(action.id).editMode;
      return state.setIn([action.id, 'editMode'], newEditModeFlag);
    default:
      return state;
  }
};

export { itemFlagReducer };
