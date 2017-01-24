import * as Immutable from 'immutable';
import { ITEM_ADD, ITEM_DELETE, ITEM_UPDATE_DESCRIPTION } from '../actions/actionTypes';

function items(state = Immutable.OrderedMap(), action) {
  switch (action.type) {
    case ITEM_ADD: {
      return state.set(action.item.id, action.item);
    }
    case ITEM_DELETE: {
      return state.delete(action.id);
    }
    case ITEM_UPDATE_DESCRIPTION: {
      if (!state.has(action.id)) {
        return state;
      }

      return state.setIn([action.id, 'description'], action.description);
    }
    default: {
      return state;
    }
  }
}

export default items;
