import { List } from 'immutable';

import { CREATE_ITEM_IN_LIST, DELETE_ITEM_FROM_LIST } from '../../constants/actionTypes';
import { IAction } from '../../interfaces/IAction';

const itemsOrderReducer = (prevState = List(), action: IAction) => {
  switch (action.type) {
    case CREATE_ITEM_IN_LIST:
      return prevState.push(action.payload.id);
    case DELETE_ITEM_FROM_LIST:
      const index = prevState.indexOf(action.payload.id);
      return prevState.splice(index, 1);
    default:
      return prevState;
  }
};

export { itemsOrderReducer };
