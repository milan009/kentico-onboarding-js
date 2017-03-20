import * as Immutable from 'immutable';

import {ITEM_EDITED} from '../actions/actionTypes';
import {Item} from '../models/Item';


const editItemValueReducer = (state: Immutable.Map<string,Item>, action: any) => {
  switch (action.type) {
    case ITEM_EDITED:
      return state.setIn([action.id, 'value'], action.value);
    default:
      return state;
  }
};

export { editItemValueReducer };
