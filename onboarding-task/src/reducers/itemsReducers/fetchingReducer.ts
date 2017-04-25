import { IAction } from '../../actions/IAction';
import {
  GET_ITEMS_FAILURE,
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
} from '../../actions/actionTypes';

const fetchingReducer = (state = false, action: IAction): boolean => {
  switch (action.type) {
    case GET_ITEMS_REQUEST:
      return true;

    case GET_ITEMS_SUCCESS:
    case GET_ITEMS_FAILURE:
      return false;

    default: {
      return state;
    }
  }
};

export {fetchingReducer};
