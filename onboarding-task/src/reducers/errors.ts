import { List } from 'immutable';
import { IAction } from '../actions/IAction';
import { FETCH_ITEMS_FAILURE, POST_ITEM_FAILURE, DELETE_ERROR } from '../actions/actionTypes';

function errors (state = List<string>(), action: IAction): List<string> {
  switch (action.type) {
    case FETCH_ITEMS_FAILURE:
    case POST_ITEM_FAILURE:
      return state.push(action.payload.error.message);

    case DELETE_ERROR:
      return state.delete(action.payload.guid);

    default:
      return state;
  }
}

export { errors };
