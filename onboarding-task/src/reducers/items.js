import * as Immutable from 'immutable';
import Item from '../models/Item';
import { ITEM_ADD, ITEM_DELETE, ITEM_UPDATE_DESCRIPTION } from '../actions/actionTypes';

function items(state = Immutable.OrderedMap(), action) {
  switch (action.type) {
    case ITEM_ADD: {
      const newItem = new Item(action.description);
      return state.set(newItem.id, newItem);
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
