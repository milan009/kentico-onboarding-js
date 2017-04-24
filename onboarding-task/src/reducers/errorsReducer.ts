import { OrderedMap } from 'immutable';
import { IAction } from '../actions/IAction';
import {
  DELETE_ITEM_FAILURE, DELETE_ITEM_SUCCESS,
  GET_ITEMS_SUCCESS, POST_ITEM_SUCCESS,
  PUT_ITEM_SUCCESS, PUT_ITEM_FAILURE,
  POST_ITEM_FAILURE, GET_ITEMS_FAILURE, DISMISS_ERROR
} from '../actions/actionTypes';

import { IErrorResponse } from '../models/IErrorResponse';

const errorsReducer = (state = OrderedMap<string, string>(), action: IAction): OrderedMap<string, string> => {
  switch (action.type) {
    case GET_ITEMS_SUCCESS:
    case POST_ITEM_SUCCESS:
    case PUT_ITEM_SUCCESS:
    case DELETE_ITEM_SUCCESS:
      return state.clear();

    case GET_ITEMS_FAILURE:
    case POST_ITEM_FAILURE:
    case PUT_ITEM_FAILURE:
    case DELETE_ITEM_FAILURE: {
      return state.merge(action.payload.errors.map((v: IErrorResponse) => [v.id, v.text]));
    }

    case DISMISS_ERROR:
      return state.delete(action.payload.key);

    default:
      return state;
  }
};

export { errorsReducer };
