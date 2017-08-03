import { OrderedMap } from 'immutable';

import * as actionTypes from '../../actions/actionTypes';
import { itemFlagsReducer } from './itemFlagsReducer';
import { ItemFlags } from '../../models/ItemFlags';

const defaultState = new OrderedMap();

export const itemFlagsMapReducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.ITEM_DELETED:
      return state.remove(action.payload.id);

    case actionTypes.ITEM_CREATED: {
      const newItem = new ItemFlags();
      return state.set(action.payload.newId, newItem);
    }

    case actionTypes.ITEM_MAKE_EDITABLE:
    case actionTypes.ITEM_CHANGE_CANCELLED:
    case actionTypes.ITEM_CHANGE_SAVED: {
      const flagsToEdit = state.get(action.payload.id);

      if (!flagsToEdit) {
        return state;
      }

      const editedInfo = itemFlagsReducer(flagsToEdit, action);
      return state.set(action.payload.id, editedInfo);
    }

    default:
      return state;
  }
};