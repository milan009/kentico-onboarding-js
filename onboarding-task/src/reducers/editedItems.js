import * as Immutable from 'immutable';
import {
  ITEM_CANCEL_EDITION,
  ITEM_UPDATE_DESCRIPTION,
  ALL_ITEMS_DESCRIPTION_UPDATE,
  ITEM_STORE_EDITED_DESCRIPTION,
  ITEM_DELETE,
} from '../actions/actionTypes';

function editedItems(state = Immutable.Map(), { type, payload }) {
  switch (type) {
    case (ALL_ITEMS_DESCRIPTION_UPDATE): {
      // All edited descriptions can be removed as Update All button was clicked
      return state
        .toSeq()
        .filter((editedItem, id) => !payload.storableItems.has(id))
        .toMap();
    }
    case (ITEM_STORE_EDITED_DESCRIPTION): {
      // Stores edition description for any currently edited item
      return state.set(payload.id, payload.editedItem);
    }
    case (ITEM_UPDATE_DESCRIPTION): // Renders item without edit mode after description update
    case (ITEM_DELETE): // Cleans up edited item after delete button click
    case (ITEM_CANCEL_EDITION): { // Renders item without edit mode after cancel button click
      return state.delete(payload.id);
    }
    default: {
      return state;
    }
  }
}

export default editedItems;
