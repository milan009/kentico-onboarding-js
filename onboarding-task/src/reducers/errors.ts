import { Set } from 'immutable';
import { IAction } from '../actions/IAction';
import { FETCH_ITEMS_FAILURE, POST_ITEM_FAILURE } from '../actions/actionTypes';


function errors (state = Set<Error>(), action: IAction): Set<Error> {
  switch (action.type) {
    case FETCH_ITEMS_FAILURE:
    case POST_ITEM_FAILURE:
      return state.add(action.payload.error);
    default:
      return state;
  }
}

export { errors };
