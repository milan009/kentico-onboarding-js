import { POST_ITEM_RECEIVE } from './actionTypes';
import { Item } from '../models/Item';
import { Fetch } from './IFetch';
import { Dispatch } from '../stores/Dispatch';
import { IItemResponse } from './IItemResponse';
import { IAction } from './IAction';

function receivePostItem(json: IItemResponse) {
  return {
    type: POST_ITEM_RECEIVE,
    payload: {
      item: json,
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
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(item),
      })
        .then((response: Response) => response.json())
        .then((json: IItemResponse) => dispatch(receivePostItem(json)))
        .catch((error) => {
          console.log(error);
          return dispatch(createErrorMessage(new Error('Oh, something went wrong!')));
        });
    };
  };
}

function postItemFactory (fetch: Fetch, url: string, createErrorMessage: (error: Error) => IAction) {
  return postItems(fetch, url, createErrorMessage);
}

export { receivePostItem, postItemFactory };
