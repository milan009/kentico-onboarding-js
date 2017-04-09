import {OrderedSet} from 'immutable';

import {ITEM_CREATED, ITEM_DELETED} from '../actions/actionTypes';
import { IAction } from '../actions/IAction';

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
