import {
  DELETE_REQUEST_FAIL, DELETE_REQUEST_STARTED,
  FETCH_REQUEST_FAIL, FETCH_REQUEST_STARTED,
  CREATE_REQUEST_FAIL, CREATE_REQUEST_STARTED,
  UPDATE_REQUEST_FAIL, UPDATE_REQUEST_STARTED,
} from '../../actions/actionTypes';
import { IAction } from '../../interfaces/IAction';
import { IRequestError } from '../../interfaces/IRequestError';

const defaultState = null;

export const errorReducer = (state: IRequestError | null = defaultState, action: IAction): IRequestError | null => {
  switch (action.type) {
    case CREATE_REQUEST_FAIL:
    case UPDATE_REQUEST_FAIL:
    case DELETE_REQUEST_FAIL:
    case FETCH_REQUEST_FAIL: {
      return {
        id: action.payload.id,
        error: action.payload.error,
        retryAction: action.payload.retryAction,
      };
    }

    case CREATE_REQUEST_STARTED:
    case UPDATE_REQUEST_STARTED:
    case FETCH_REQUEST_STARTED:
    case DELETE_REQUEST_STARTED:
      return null;

    default:
      return state;
  }
};
