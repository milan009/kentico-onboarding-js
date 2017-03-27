import {
  ITEM_CREATE,
  ITEM_DELETE,
  ITEM_UPDATE,
  ITEM_TOGGLE_EDIT,
} from '../actions/actionTypes.js';
import { Map } from 'immutable';
import { ItemUi } from '../models/ItemUi.js';

const itemsUiPropertiesReducer = (state = Map(), action) => {
  switch (action.type) {
    case ITEM_CREATE: {
      return state.set(action.payload.id, new ItemUi());
    }

    case ITEM_UPDATE:
    case ITEM_TOGGLE_EDIT: {
      const itemEditing = state.get(action.payload.id).editFormVisible;
      return state.mergeIn([action.payload.id], { editFormVisible: !itemEditing });
    }

    case ITEM_DELETE: {
      return state.delete(action.payload.id);
    }

    default: {
      return state;
    }
  }
};

export { itemsUiPropertiesReducer };
