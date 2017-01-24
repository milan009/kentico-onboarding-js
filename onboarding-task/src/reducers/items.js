import * as Immutable from 'immutable';
import { ITEM_ADD, ITEM_DELETE, ITEM_UPDATE_DESCRIPTION } from '../actions/actionTypes';

function items(state = Immutable.OrderedMap(), { type, payload }) {
  switch (type) {
    case ITEM_ADD: {
      return state.set(payload.id, payload);
    }
    case ITEM_DELETE: {
      return state.delete(payload);
    }
    case ITEM_UPDATE_DESCRIPTION: {
      if (!state.has(payload.id)) {
        return state;
      }

      return state.setIn([payload.id, 'description'], payload.description);
    }
    default: {
      return state;
    }
  }
}

export default items;
