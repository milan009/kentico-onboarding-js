import * as Immutable from 'immutable';
import { ITEM_UPDATE_IS_EDITED, ITEM_UPDATE_DESCRIPTION } from '../actions/actionTypes';

function editedItems(state = Immutable.Set(), action) {
  switch (action.type) {
    case (ITEM_UPDATE_DESCRIPTION): {
      // Renders item without edit mode after description update
      return state.delete(action.id);
    }
    case (ITEM_UPDATE_IS_EDITED): {
      if (!action.isEdited) {
        // by removing id from the set signals it is not edited anymore
        return state.delete(action.id);
      }

      // by adding id to the set signals it should be rendered in edit mode
      return state.add(action.id);
    }
    default: {
      return state;
    }
  }
}

export default editedItems;
