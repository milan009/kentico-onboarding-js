import { FETCH_ITEMS_REQUEST, FETCH_ITEMS_RECEIVE, FETCH_ITEMS_FAIL } from './actionTypes';
import { Fetch } from './IFetch';
import { Dispatch } from '../stores/Dispatch';
import { IItemResponse } from './IItemResponse';

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

function failFetchItems(error: Error) {
  return {
    type: FETCH_ITEMS_FAIL,
    payload: {
      error
    }
  };
}

function fetchItems(fetch: Fetch, url: string) {
  return (dispatch: Dispatch) => {
    dispatch(requestItems());

    return fetch(url)
      .then((response: Response) => response.json())
      .then((json: IItemResponse[]) => dispatch(receiveItems(json)))
      .catch((error) => dispatch(failFetchItems(error)));
  };
}

function fetchItemsFactory(fetch: Fetch, url: string) {
  return fetchItems(fetch, url);
}

export { fetchItemsFactory, requestItems, receiveItems, failFetchItems };
