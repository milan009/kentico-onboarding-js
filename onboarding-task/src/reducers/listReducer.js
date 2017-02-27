import { OrderedMap } from 'immutable';
import { ADD_ITEM, DELETE_ITEM, UPDATE_ITEM } from '../actions/actionTypes.js';

const list = (state = OrderedMap(), action) => {
  switch (action.type) {
    case ADD_ITEM:
      return state.set(action.payload.item.id, action.payload.item);

    case DELETE_ITEM:
      return state.delete(action.payload.id);

    case UPDATE_ITEM:
      return state.updateIn([action.payload.id], item => {
        return item.set('text', action.payload.text);
      });

    default:
      return state;
  }
};

export { list };
