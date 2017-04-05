import {IAction} from '../actions/IAction';
import { FETCH_ITEMS_FAIL, FETCH_ITEMS_RECEIVE, FETCH_ITEMS_REQUEST } from '../actions/actionTypes';

const isFetching = (state = true, action: IAction) => {
  switch (action.type) {
    case FETCH_ITEMS_REQUEST:
      return true;

    case FETCH_ITEMS_RECEIVE:
      return false;

    case FETCH_ITEMS_FAIL:
      return false;

    default:
      return state;
  }
};

export { isFetching };
