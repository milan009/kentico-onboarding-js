import Immutable from 'immutable';

import { ADD_ITEM_TO_LIST, DELETE_ITEM_FROM_LIST } from '../constants/actionTypes';

const itemsOrderReducer = (prevState = new Immutable.List(), action) => {
  switch (action.type) {
    case ADD_ITEM_TO_LIST:
      return prevState.push(action.id);
    case DELETE_ITEM_FROM_LIST: {
      const index = prevState.indexOf(action.id);
      return prevState.splice(index, 1);
    }
    default:
      return prevState;
  }
};

export { itemsOrderReducer };
