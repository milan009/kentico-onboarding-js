import {
  DELETE_REQUEST_FAIL, DELETE_REQUEST_STARTED,
  FETCH_FAIL, FETCH_STARTED,
  POST_REQUEST_FAIL, POST_REQUEST_STARTED,
  PUT_REQUEST_FAIL, PUT_REQUEST_STARTED,
} from '../../actions/actionTypes';
import { IAction } from '../../interfaces/IAction';

const defaultState = null;

export const errorReducer = (state: any = defaultState, action: IAction): any => {
  switch (action.type) {
    case POST_REQUEST_FAIL:
    case PUT_REQUEST_FAIL:
    case DELETE_REQUEST_FAIL:
    case FETCH_FAIL: {
      return {
        displayList: action.payload.displayList,
        error: action.payload.error,
        action: action.payload.action,
      };
    }

    case POST_REQUEST_STARTED:
    case PUT_REQUEST_STARTED:
    case FETCH_STARTED:
    case DELETE_REQUEST_STARTED:
      return null;

    default:
      return state;
  }
};
