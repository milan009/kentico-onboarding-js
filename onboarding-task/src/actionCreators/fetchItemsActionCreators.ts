import {IAction} from '../interfaces/IAction';
import {
  FETCH_ITEMS_REQUEST,
  FETCH_ITEMS_SUCCESS,
  FETCH_ITEMS_FAILURE,
} from '../constants/actionTypes';
import { fetchItemsFactory } from './fetchItemsFactory';
import { IFetchedItem } from '../interfaces/IFetchedItem';

const fetchItemsRequest = (): IAction => {
  return {
    type: FETCH_ITEMS_REQUEST,
    payload: {},
  };
};

const fetchItemsSuccess = (response: IFetchedItem[]): IAction => {
  return {
    type: FETCH_ITEMS_SUCCESS,
    payload: {
      response: response,
    },
  };
};

const fetchItemsFailure = (errorMessage: string): IAction => {
  return {
    type: FETCH_ITEMS_FAILURE,
    payload: {
      response: errorMessage,
    },
  };
};

const fetchItems = fetchItemsFactory(fetch);

export { fetchItemsRequest, fetchItemsFailure, fetchItemsSuccess, fetchItems };
