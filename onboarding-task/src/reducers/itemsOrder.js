import { ADD_ITEM, DELETE_ITEM } from '../actions/actionTypes.js';
import Immutable from 'immutable';

const list = Immutable.List();
const itemsOrder = (state = list, action) => {
  switch (action.type) {
    case ADD_ITEM: {
      return state.push(action.payload.guid);
    }
    case DELETE_ITEM: {
      const index = state.indexOf(action.payload.guid);
      return state.splice(index, 1);
    }
    default:
      return state;
  }
};

export { itemsOrder };
