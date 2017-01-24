import * as Immutable from 'immutable';
import EditedItem from '../models/EditedItem';
import {
  ITEM_UPDATE_IS_EDITED,
  ITEM_UPDATE_DESCRIPTION,
  ALL_ITEMS_DESCRIPTION_UPDATE,
  ITEM_STORE_EDITED_DESCRIPTION,
  ITEM_DELETE,
} from '../actions/actionTypes';

function editedItems(state = Immutable.Map(), { type, payload }) {
  switch (type) {
    case (ALL_ITEMS_DESCRIPTION_UPDATE): {
      // All edited descriptions can be removed as Update All button was clicked
      return state.mergeWith(
          editedItem => editedItem.set('isEdited', false),
          payload);
    }
    case (ITEM_STORE_EDITED_DESCRIPTION): {
      // Stores edition description for any currently edited item
      return state.set(payload.id, new EditedItem(payload.description, payload.isOriginal));
    }
    case (ITEM_DELETE): {
      // Renders item without edit mode after description update
      return state.delete(payload);
    }
    case (ITEM_UPDATE_DESCRIPTION): {
      // Renders item without edit mode after description update
      return state.delete(payload.id);
    }
    case (ITEM_UPDATE_IS_EDITED): {
      if (state.has(payload.id)) {
        // item already exists in the map, isEdited has to be updated
        return state.setIn([payload.id, 'isEdited'], payload.isEdited);
      }

      if (payload.isEdited) {
        // adding item to map with isEdited flag set
        return state.set(payload.id, new EditedItem(null));
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
