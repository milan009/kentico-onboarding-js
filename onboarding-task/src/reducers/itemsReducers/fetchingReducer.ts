import { IAction } from '../../actions/IAction';
import {
  DELETE_ITEM_FAILURE,
  DELETE_ITEM_REQUEST, DELETE_ITEM_SUCCESS,
  GET_ITEMS_FAILURE,
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS, POST_ITEM_FAILURE, POST_ITEM_REQUEST,
  POST_ITEM_SUCCESS, PUT_ITEM_FAILURE, PUT_ITEM_REQUEST, PUT_ITEM_SUCCESS
} from '../../actions/actionTypes';

const fetchingReducer = (state = false, action: IAction): boolean => {
  switch (action.type) {
    case POST_ITEM_REQUEST:
    case GET_ITEMS_REQUEST:
    case DELETE_ITEM_REQUEST:
    case PUT_ITEM_REQUEST:
      return true;

    case POST_ITEM_SUCCESS:
    case POST_ITEM_FAILURE:
    case GET_ITEMS_SUCCESS:
    case GET_ITEMS_FAILURE:
    case DELETE_ITEM_SUCCESS:
    case DELETE_ITEM_FAILURE:
    case PUT_ITEM_SUCCESS:
    case PUT_ITEM_FAILURE:
      return false;

    default: {
      return state;
    }
  }
};

export {fetchingReducer};
