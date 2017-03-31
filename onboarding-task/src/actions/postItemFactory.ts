import { POST_ITEM_FAIL, POST_ITEM_RECEIVE, POST_ITEM_REQUEST } from './actionTypes';
import { Item } from '../models/Item';
import { Fetch } from './IFetch';

function requestPostItem(item: Item) {
  return {
    type: POST_ITEM_REQUEST,
    payload: {
      item
    }
  };
}

function receivePostItem(json: any) {
  return {
    type: POST_ITEM_RECEIVE,
    payload: {
      item: json,
    }
  };
}

function failPostItem(error: Error) {
  return {
    type: POST_ITEM_FAIL,
    payload: {
      error
    }
  };
}

function postItems(fetch: Fetch, url: string) {
  return (dispatch: any, item: Item) => {
    dispatch(requestPostItem(item));

    return fetch(url, {
        method: 'POST',
        body: item,
      })
      .then((response: any) => response.json())
      .then((json: any) => dispatch(receivePostItem(json)))
      .catch((error) => dispatch(failPostItem(error)));
  };
}

function postItemFactory (fetch: Fetch, url: string) {
  return () => postItems(fetch, url);
}

export { requestPostItem, receivePostItem, failPostItem, postItemFactory };
