import * as Immutable from 'immutable';
import EditedItem from '../models/EditedItem';
import {
  ITEM_UPDATE_IS_EDITED,
  ITEM_UPDATE_DESCRIPTION,
  ALL_ITEMS_DESCRIPTION_UPDATE,
  ITEM_STORE_EDITED_DESCRIPTION,
  ITEM_DELETE,
} from '../actions/actionTypes';

function editedItems(state = Immutable.Map(), action) {
  switch (action.type) {
    case (ALL_ITEMS_DESCRIPTION_UPDATE): {
      // All edited descriptions can be removed as Update All button was clicked
      return state.mergeWith(
          editedItem => editedItem.set('isEdited', false),
          action.storableItems);
    }
    case (ITEM_STORE_EDITED_DESCRIPTION): {
      // Stores edition description for any currently edited item
      return state.set(action.id, new EditedItem(action.description));
    }
    case (ITEM_DELETE):
    case (ITEM_UPDATE_DESCRIPTION): {
      // Renders item without edit mode after description update
      return state.delete(action.id);
    }
    case (ITEM_UPDATE_IS_EDITED): {
      if (state.has(action.id)) {
        // item already exists in the map, isEdited has to be updated
        return state.setIn([action.id, 'isEdited'], action.isEdited);
      }

      if (action.isEdited) {
        // adding item to map with isEdited flag set
        return state.set(action.id, new EditedItem(null));
      }

      // item is not in the map and it is not edited - no change in state required
      return state;
    }
    default: {
      return state;
    }
  }
}

export default editedItems;
