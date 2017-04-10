import {IAction} from '../actions/IAction';
import {FETCH_ITEMS_FAILURE, FETCH_ITEMS_REQUEST, FETCH_ITEMS_SUCCESS} from '../actions/actionTypes';

function fetching(state = true, action: IAction): boolean {
  switch (action.type) {
    case FETCH_ITEMS_REQUEST:
      return true;
    case FETCH_ITEMS_SUCCESS:
    case FETCH_ITEMS_FAILURE:
      return false;
    default:
      return state;
  }
}

export { fetching };
