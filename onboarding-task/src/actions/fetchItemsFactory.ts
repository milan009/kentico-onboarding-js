import { v4 } from 'uuid';
import { FETCH_ITEMS_REQUEST, FETCH_ITEMS_RECEIVE, FETCH_ITEMS_FAIL } from './actionTypes';
import { Fetch } from './IFetch';
import { Dispatch } from '../stores/Dispatch';
import { IItemResponse } from './IItemResponse';
import { IAction } from './IAction';
import { ErrorMessage } from '../models/ErrorMessage';

function requestItems() {
  return {
    type: FETCH_ITEMS_REQUEST,
    payload: {},
  };
}

function receiveItems(json: IItemResponse[]) {
  return {
    type: FETCH_ITEMS_RECEIVE,
    payload: {
      items: json,
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

const failFetchItems = failFetchItemsFactory(v4);

function fetchItems(fetch: Fetch, url: string, createErrorMessage: (error: Error) => IAction) {
  return (dispatch: Dispatch) => {
    dispatch(requestItems());

    return fetch(url)
      .then((response: Response) => response.json())
      .then((json: IItemResponse[]) => dispatch(receiveItems(json)))
      .catch((error) => {
        console.error(error);
        return dispatch(createErrorMessage(new Error('Oh, something went wrong!')));
      });
  };
}

function fetchItemsFactory(fetch: Fetch, url: string, createErrorMessage: (error: Error) => IAction) {
  return fetchItems(fetch, url, createErrorMessage);
}

export { fetchItemsFactory, requestItems, receiveItems, failFetchItems, failFetchItemsFactory };
