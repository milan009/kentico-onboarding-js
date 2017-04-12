import { OrderedSet } from 'immutable';

import { IAction } from '../actions/IAction';
import { CREATE_ITEM, DELETE_ITEM } from '../actions/actionTypes';

const itemsOrderReducer = (state = OrderedSet<string>(),
                           action: IAction,) => {
  switch (action.type) {
    case DELETE_ITEM:
      return state.delete(action.payload.id);

    case CREATE_ITEM:
      return state.add(action.payload.id);

    default:
      return state;
  }
};

export { itemsOrderReducer };
