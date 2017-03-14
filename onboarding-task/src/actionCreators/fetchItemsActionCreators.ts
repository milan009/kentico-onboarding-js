import {IAction} from '../interfaces/IAction';
import {
  FETCH_ITEMS_REQUEST,
  FETCH_ITEMS_SUCCESS,
  FETCH_ITEMS_FAILURE,
} from '../constants/actionTypes';
import { fetchItemsFactory } from './fetchItemsFactories';

const fetchItemsRequest = (): IAction => {
  return {
    type: FETCH_ITEMS_REQUEST,
    payload: {},
  };
};


interface FetchedItem {
  id: string;
  text: string;
}

const fetchItemsSuccess = (response: FetchedItem[]): IAction => {
  return {
    type: FETCH_ITEMS_SUCCESS,
    payload: {
      response: response,
    },
  };
};

const fetchItemsFailure = (response: string): IAction => {
  return {
    type: FETCH_ITEMS_FAILURE,
    payload: {
      response: response,
    },
  };
};

const fetchItems = fetchItemsFactory(fetch);

export { fetchItemsRequest, fetchItemsFailure, fetchItemsSuccess, fetchItems };
