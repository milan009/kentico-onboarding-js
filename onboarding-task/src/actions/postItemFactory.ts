import { POST_ITEM_FAIL, POST_ITEM_RECEIVE } from './actionTypes';
import { Item } from '../models/Item';
import { Fetch } from './IFetch';
import { Dispatch } from '../stores/Dispatch';
import { IItemResponse } from './IItemResponse';

function receivePostItem(json: IItemResponse) {
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
  return (text: string) => {
    return (dispatch: Dispatch) => {
      const item = new Item({ text });

      return fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(item),
      })
        .then((response: Response) => response.json())
        .then((json: IItemResponse) => dispatch(receivePostItem(json)))
        .catch((error) => dispatch(failPostItem(error)));
    };
  };
}

function postItemFactory (fetch: Fetch, url: string) {
  return postItems(fetch, url);
}

export { receivePostItem, failPostItem, postItemFactory };
