import * as Immutable from 'immutable';
import { ITEM_ADD, ITEM_DELETE, ITEM_UPDATE_DESCRIPTION, ALL_ITEMS_DESCRIPTION_UPDATE } from '../actions/actionTypes';

function items(state = Immutable.OrderedMap(), { type, payload }) {
  switch (type) {
    case ITEM_ADD: {
      return state.set(payload.item.id, payload.item);
    }
    case ITEM_DELETE: {
      return state.delete(payload.id);
    }
    case ITEM_UPDATE_DESCRIPTION: {
      if (!state.has(payload.id)) {
        return state;
      }

      return state.setIn([payload.id, 'description'], payload.description);
    }
    case ALL_ITEMS_DESCRIPTION_UPDATE: {
      return state.mergeWith(
        (item, editedItem) => item.set('description', editedItem.description),
        payload.storableItems);
    }
    default: {
      return state;
    }
  }
}

export default items;
