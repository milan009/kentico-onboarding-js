import { IAction } from '../actions/IAction';
import {
  FETCH_ITEMS_FAILURE,
  FETCH_ITEMS_REQUEST,
  FETCH_ITEMS_SUCCESS
} from '../actions/actionTypes';

function loaded(state = false, action: IAction): boolean {
  switch (action.type) {
    case FETCH_ITEMS_REQUEST:
      return false;
    case FETCH_ITEMS_SUCCESS:
    case FETCH_ITEMS_FAILURE:
      return true;
    default:
      return state;
  }
}

export { loaded };
