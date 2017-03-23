import * as Immutable from 'immutable';

import {ITEM_CREATED, ITEM_DELETED} from '../actions/actionTypes';

const itemOrderReducer = (state: Immutable.OrderedSet<string>, action: any) => {
  switch (action.type) {
    case ITEM_DELETED:
      return state.delete(action.id);

    case ITEM_CREATED:
      return state.add(action.id);

    default:
      return state;
  }
};

export { itemOrderReducer };
