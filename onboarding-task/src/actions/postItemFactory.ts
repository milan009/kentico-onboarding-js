import { POST_ITEM_RECEIVE } from './actionTypes';
import { Item } from '../models/Item';
import { Fetch } from '../stores/IFetch';
import { Dispatch } from '../stores/Dispatch';
import { IItemResponse } from '../models/IItemResponse';
import { IAction } from './IAction';
import { parseResponse } from '../utils/ajaxUtils';

function receivePostItem(receivedItem: IItemResponse) {
  return {
    type: POST_ITEM_RECEIVE,
    payload: {
      item: receivedItem,
    }
  };
}

function postItems(fetch: Fetch, url: string, createErrorMessage: (error: Error) => IAction) {
  return (text: string) => {
    return (dispatch: Dispatch) => {
      const item = new Item({ text });

      return fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accepts': 'application/json',
        },
        body: JSON.stringify(item),
      })
        .then(parseResponse)
        .then((receivedItem: IItemResponse) => dispatch(receivePostItem(receivedItem)))
        .catch((error) => {
          return dispatch(createErrorMessage(error));
        });
    };
  };
}

function postItemFactory (fetch: Fetch, url: string, createErrorMessage: (error: Error) => IAction) {
  return () => postItems(fetch, url, createErrorMessage);
}

export { receivePostItem, postItemFactory };