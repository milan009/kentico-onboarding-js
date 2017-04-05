import { FETCH_ITEMS_REQUEST, FETCH_ITEMS_RECEIVE, FETCH_ITEMS_FAIL } from './actionTypes';
import { Fetch } from './IFetch';
import { Dispatch } from '../stores/Dispatch';
import { IItemResponse } from './IItemResponse';
import {IAction} from './IAction';

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

function failFetchItems() {
  return {
    type: FETCH_ITEMS_FAIL,
    payload: {
    }
  };
}

function fetchItems(fetch: Fetch, url: string, createErrorMessage: (error: Error) => IAction) {
  return (dispatch: Dispatch) => {
    dispatch(requestItems());

    return fetch(url)
      .then((response: Response) => response.json())
      .then((json: IItemResponse[]) => dispatch(receiveItems(json)))
      .catch((error) => {
        console.log(error);
        dispatch(failFetchItems());
        return dispatch(createErrorMessage(new Error('Oh, something went wrong!')));
      });
  };
}

function fetchItemsFactory(fetch: Fetch, url: string, createErrorMessage: (error: Error) => IAction) {
  return fetchItems(fetch, url, createErrorMessage);
}

export { fetchItemsFactory, requestItems, receiveItems, failFetchItems };
