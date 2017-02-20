import { OrderedMap } from 'immutable';
import { ADD_ITEM, DELETE_ITEM, UPDATE_ITEM } from '../actions/actionTypes.js';
import { Item } from '../models/ItemModel.js';

const list = (state = OrderedMap(), action) => {
  switch (action.type) {
    case ADD_ITEM:
      return state.set(action.payload.id, Item({ id: action.payload.id, text: action.payload.text }));

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
