import Immutable from 'immutable';

import { CREATE_ITEM_IN_LIST, DELETE_ITEM_FROM_LIST } from '../../constants/actionTypes';

const itemsOrderReducer = (prevState = new Immutable.List(), action) => {
  switch (action.type) {
    case CREATE_ITEM_IN_LIST:
      return prevState.push(action.payload.id);
    case DELETE_ITEM_FROM_LIST: {
      const index = prevState.indexOf(action.payload.id);
      return prevState.splice(index, 1);
    }
    default:
      return prevState;
  }
};

export { itemsOrderReducer };
