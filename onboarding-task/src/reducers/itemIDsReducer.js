import { List } from 'immutable';
import { ADD_ITEM, DELETE_ITEM } from '../constants/actionTypes.js';

const itemIDsReducer = (state = List(), action) => {
  switch (action.type) {
    case ADD_ITEM:
      return state.push(action.payload.id);

    case DELETE_ITEM: {
      const indexOfItem = state.indexOf(action.payload.id);
      return state.delete(indexOfItem);
    }

    default:
      return state;
  }
};

export { itemIDsReducer };
