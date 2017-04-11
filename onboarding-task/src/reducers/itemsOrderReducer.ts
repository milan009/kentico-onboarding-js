import {OrderedSet} from 'immutable';

import { IAction } from '../actions/IAction';
import {ITEM_CREATED, ITEM_DELETED} from '../actions/actionTypes';

const itemsOrderReducer = (
  state : OrderedSet<string> = OrderedSet<string>(),
  action: IAction,
) => {
  switch (action.type) {
    case ITEM_DELETED:
      return state.delete(action.payload.id);

    case ITEM_CREATED:
      return state.add(action.payload.id);

    default:
      return state;
  }
};

export { itemsOrderReducer };
