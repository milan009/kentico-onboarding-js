import * as Immutable from 'immutable';
import { ITEM_UPDATE_IS_EDITED, ITEM_UPDATE_DESCRIPTION, ALL_ITEMS_DESCRIPTION_UPDATE, ITEM_STORE_EDITED_DESCRIPTION } from '../actions/actionTypes';

function editedItems(state = Immutable.Map(), action) {
  switch (action.type) {
    case (ALL_ITEMS_DESCRIPTION_UPDATE): {
      // All edited descriptions can be removed as Update All button was clicked
      return state.clear();
    }
    case (ITEM_STORE_EDITED_DESCRIPTION): {
      // Stores edition description for any currently edited item
      return state.set(action.id, action.description);
    }
    case (ITEM_UPDATE_DESCRIPTION): {
      // Renders item without edit mode after description update
      return state.delete(action.id);
    }
    case (ITEM_UPDATE_IS_EDITED): {
      if (!action.isEdited) {
        // by removing id from the map signals it is not edited anymore
        return state.delete(action.id);
      }

      // by adding id to the map signals it should be rendered in edit mode
      return state.set(action.id, '');
    }
    default: {
      return state;
    }
  }
}

export default editedItems;
