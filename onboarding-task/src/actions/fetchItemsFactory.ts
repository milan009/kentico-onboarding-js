import { FETCH_ITEMS_REQUEST, FETCH_ITEMS_RECEIVE, FETCH_ITEMS_FAIL } from './actionTypes';
import { Fetch } from './IFetch';

function requestItems() {
  return {
    type: FETCH_ITEMS_REQUEST,
  };
}

function receiveItems(json: any) {
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
  return (dispatch: any) => {
    dispatch(requestItems());

    return fetch(url)
      .then((response: any) => response.json())
      .then((json: any) => dispatch(receiveItems(json)))
      .catch((error) => dispatch(failFetchItems(error)));
  };
}

function fetchItemsFactory(fetch: Fetch, url: string) {
  return () => fetchItems(fetch, url);
}

export { fetchItemsFactory, requestItems, receiveItems, failFetchItems };
