import {
  DELETE_REQUEST_FAIL,
  FETCH_FAIL,
  POST_REQUEST_FAIL,
  PUT_REQUEST_FAIL,
} from '../../actions/actionTypes';
import { IAction } from '../../interfaces/IAction';

const defaultState = null;

export const errorReducer = (state: any = defaultState, action: IAction): any => {
  switch (action.type) {
    case POST_REQUEST_FAIL:
    case PUT_REQUEST_FAIL:
    case DELETE_REQUEST_FAIL:
    case FETCH_FAIL:
      return action.payload.error;

    default:
      return state;
  }
};
