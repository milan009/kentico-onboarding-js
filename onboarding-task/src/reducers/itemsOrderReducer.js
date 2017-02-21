import Immutable from 'immutable';

import { ADD_ITEM_TO_LIST, DELETE_ITEM_FROM_LIST } from '../actionTypes';

const itemsOrderReducer = (prevState = new Immutable.List(), action) => {
  switch (action.type) {
    case ADD_ITEM_TO_LIST:
      return this.state.itemsOrder.push(action.id);
    case DELETE_ITEM_FROM_LIST: {
      const index = this.state.itemsOrder.indexOf(action.id);
      return prevState.itemsOrder.splice(index, 1);
    }
    default:
      return prevState;
  }
};
