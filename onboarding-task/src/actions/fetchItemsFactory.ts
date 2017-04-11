import { FETCH_ITEMS_REQUEST, FETCH_ITEMS_RECEIVE, FETCH_ITEMS_FAIL } from './actionTypes';
import { Fetch } from '../stores/IFetch';
import { Dispatch } from '../stores/Dispatch';
import { IItemResponse } from '../models/IItemResponse';
import { IAction } from './IAction';
import { ErrorMessage } from '../models/ErrorMessage';
import { parseResponse } from '../utils/ajaxUtils';

function requestItems() {
  return {
    type: FETCH_ITEMS_REQUEST,
    payload: {},
  };
}

function receiveItems(receivedItems: IItemResponse[]) {
  return {
    type: FETCH_ITEMS_RECEIVE,
    payload: {
      items: receivedItems,
    }
  };
}

function failFetchItemsFactory(idGenerator: any) {
  return (error: Error) => {
    return {
      type: FETCH_ITEMS_FAIL,
      payload: {
        error: new ErrorMessage({
          message: error.message,
          id: idGenerator(),
        }),
      }
    };
  };
}

function fetchItems(fetch: Fetch, url: string, createErrorMessage: (error: Error) => IAction) {
  return (dispatch: Dispatch) => {
    dispatch(requestItems());

    return fetch(url)
      .then(parseResponse)
      .then((receivedItems: IItemResponse[]) => dispatch(receiveItems(receivedItems)))
      .catch((error) => {
        console.error(error);
        return dispatch(createErrorMessage(new Error('Cannot reach server. Try again later.')));
      });
  };
}

function fetchItemsFactory(fetch: Fetch, url: string, createErrorMessage: (error: Error) => IAction) {
  return () => fetchItems(fetch, url, createErrorMessage);
}

export { fetchItemsFactory, requestItems, receiveItems, failFetchItemsFactory };
