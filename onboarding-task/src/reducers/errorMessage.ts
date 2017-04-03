import { FETCH_ITEMS_FAIL, POST_ITEM_FAIL } from '../actions/actionTypes';
import { IAction } from '../actions/IAction';

const errorMessage = (state = '', action: IAction) => {
  switch (action.type) {
    case FETCH_ITEMS_FAIL:
      return action.payload.error;

    case POST_ITEM_FAIL:
      return action.payload.error;

    default:
      return state;
  }
};

export { errorMessage };
