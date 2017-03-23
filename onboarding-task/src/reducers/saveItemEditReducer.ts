import * as Immutable from 'immutable';

import {ITEM_EDITED} from '../actions/actionTypes';
import {Item} from '../models/Item';
import {ItemFlags} from '../models/ItemFlags';
import {editItem, toggleItemViewMode} from '../actions/actionCreators';
import {itemDataReducer} from './itemDataReducer';
import {itemFlagReducer} from './itemFlagReducer';

const saveItemEditReducer = (state: { items: Immutable.Map<string,Item>, itemsDisplayFlags: Immutable.Map<string,ItemFlags> }, action: any) => {
  switch (action.type) {
    case ITEM_EDITED: {
      state.items = itemDataReducer(state.items, editItem(action.id, action.value));
      state.itemsDisplayFlags = itemFlagReducer(state.itemsDisplayFlags, toggleItemViewMode(action.id));
      return state;
    }
    default:
      return state;
  }
};

export { saveItemEditReducer };
