import {IAction} from '../interfaces/IAction';
import {
  FETCH_ITEMS_REQUEST,
  FETCH_ITEMS_SUCCESS,
  FETCH_ITEMS_FAILURE,
} from '../constants/actionTypes';

export const fetchItemsRequest = (): IAction => {
  return {
    type: FETCH_ITEMS_REQUEST,
    payload: {},
  };
};

export const fetchItemsSuccess = (response: string): IAction => {
  return {
    type: FETCH_ITEMS_SUCCESS,
    payload: {
      response: response,
    },
  };
};

export const fetchItemsFailure = (response: string): IAction => {
  return {
    type: FETCH_ITEMS_FAILURE,
    payload: {
      response: response,
    },
  };
};
