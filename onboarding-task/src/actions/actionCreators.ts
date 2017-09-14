import { Dispatch } from 'redux';
import * as uuidV4 from 'uuid';
import { Promise } from 'es6-promise';
import { OrderedMap } from 'immutable';

import { IAction } from '../interfaces/IAction';
import {
  ITEM_CHANGE_CANCELLED,
  ITEM_CHANGE_SAVED,
  ITEM_CREATED,
  ITEM_DELETED,
  ITEM_MAKE_EDITABLE,

  FETCH_STARTED,
  FETCH_SUCCESS,
  FETCH_FAIL,

  POST_REQUEST_FAIL,
  POST_REQUEST_STARTED,
  POST_REQUEST_SUCCESS,

  DELETE_REQUEST_FAIL,
  DELETE_REQUEST_SUCCESS,
  DELETE_REQUEST_STARTED,

  PUT_REQUEST_FAIL,
  PUT_REQUEST_SUCCESS,
  PUT_REQUEST_STARTED,

  PARSE_RESPONSE_FINISHED,
  PARSE_RESPONSE_STARTED,
} from './actionTypes';
import { IStore } from '../interfaces/IStore';

import { ItemsDataMap } from '../reducers/list/itemsReducer';
import { ItemData } from '../models/ItemData';

// region Frontend related action creators

export const createItemFactory = (idGenerator: () => string): (text: string) => IAction => (
  (text: string) => ({
    type: ITEM_CREATED,
    payload: {
      text,
      newId: idGenerator(),
    },
  })
);
const createItemWithUuidV4 = createItemFactory(uuidV4);

export { createItemWithUuidV4 as createItem };

export const deleteItem = (id: string): IAction => ({
  type: ITEM_DELETED,
  payload: {id},
});

export const cancelChange = (id: string): IAction => ({
  type: ITEM_CHANGE_CANCELLED,
  payload: {id},
});

export const saveChange = (id: string, text: string): IAction => ({
  type: ITEM_CHANGE_SAVED,
  payload: {
    id,
    text,
  },
});

export const makeEditable = (id: string): IAction => ({
  type: ITEM_MAKE_EDITABLE,
  payload: {id},
});

// endregion

// region GET related action creators

export const startFetchingItems = (): IAction => ({
  type: FETCH_STARTED,
});

export const fetchingSucceeded = (json: any): IAction => ({
  type: FETCH_SUCCESS,
  payload: {
    items: json,
  },
});

export const fetchingFailed = (error: string): IAction => ({
  type: FETCH_FAIL,
  payload: {
    error
  }
});

export const parsingStarted = (jsonResponse: any): IAction => ({
  type: PARSE_RESPONSE_STARTED,
  payload: {
    jsonResponse,
  }
});

export const parsingFinished = (parsedItems: ItemsDataMap): IAction => ({
  type: PARSE_RESPONSE_FINISHED,
  payload: {
    parsedItems,
  }
});

// endregion

// region POST related action creators

export const postStarted = (text: string): IAction => ({
  type: POST_REQUEST_STARTED,
  payload: {
    text,
  }
});

export const postSucceeded = (json: any): IAction => ({
  type: POST_REQUEST_SUCCESS,
  payload: {
    item: json,
  },
});

export const postFailed = (error: string): IAction => ({
  type: POST_REQUEST_FAIL,
  payload: {
    error
  }
});

// endregion

// region PUT related action creators

export const putStarted = (item: ItemData): IAction => ({
  type: PUT_REQUEST_STARTED,
  payload: {
    item,
  }
});

export const putSucceeded = (json: any): IAction => ({
  type: PUT_REQUEST_SUCCESS,
  payload: {
    item: json,
  },
});

export const putFailed = (error: string): IAction => ({
  type: PUT_REQUEST_FAIL,
  payload: {
    error
  }
});

// endregion

// region DELETE related action creators

export const deleteStarted = (id: string): IAction => ({
  type: DELETE_REQUEST_STARTED,
  payload: {
    id,
  }
});

export const deleteSucceeded = (id: string): IAction => ({
  type: DELETE_REQUEST_SUCCESS,
  payload: {
    id
  },
});

export const deleteFailed = (error: string): IAction => ({
  type: DELETE_REQUEST_FAIL,
  payload: {
    error
  }
});

// endregion

const parseAPIResponseJson = (json: any) => {
  return new Promise<ItemsDataMap>((resolve) => {
    let parsedItems = OrderedMap<string, ItemData>();
    json.map((item: any) => {
      parsedItems = parsedItems.set(item.Id, new ItemData(
        {
          id: item.Id,
          text: item.Text
        }));
    });

    resolve(parsedItems);
  });
};

// region THUNKS
export const parseItems = (json: any) => {
  return function (dispatch: Dispatch<IStore>) {
    dispatch(parsingStarted(json));

    return parseAPIResponseJson(json)
      .then((parsedItems: any) => dispatch(parsingFinished(parsedItems)));
  };
};

export const putSavedItem = (item: ItemData) => {
  return function (dispatch: any) {
    const headers = new Headers();
    headers.append('Content-type', 'Application/json');

    const init = {
      method: 'PUT',
      headers,
      body: JSON.stringify({Id: item.id, Text: item.text}),
    };

    dispatch(putStarted(item));

    return fetch(`api/v1/items/${item.id}`, init)
      .then((response) => {
        if (!response.ok) {
          return Promise.reject(new Error(`${response.status}: ${response.statusText}`));
        }
        return response.json();
      })
      .then(
        (json) => {
          dispatch(putSucceeded(json));
          return json;
        },
        (error) => dispatch(putFailed(error)))
      .then((receivedItem: any) => dispatch(saveChange(receivedItem.Id, receivedItem.Text)));
  };
};

export const postNewItem = (newText: string) => {
  return function (dispatch: any) {
    const headers = new Headers();
    headers.append('Content-type', 'Application/json');

    const guid = '00000000-0000-0000-0000-000000000000';

    const init = {
      method: 'POST',
      headers,
      body: JSON.stringify({Id: guid, Text: newText}),
    };

    dispatch(postStarted(newText));

    return fetch(`api/v1/items`, init)
      .then((response) => {
        if (!response.ok) {
          return Promise.reject(new Error(`${response.status}: ${response.statusText}`));
        }
        return response.json();
      })
      .then(
        (json) => {
          dispatch(postSucceeded(json));
          return json.Id;
        },
        (error) => dispatch(postFailed(error)))
      .then((id) => dispatch(createItemFactory(() => id)(newText)));
  };
};

export const deleteStoredItem = (id: string) => {
  return function (dispatch: any) {
    const headers = new Headers();
    const init = {
      method: 'DELETE',
      headers,
    };

    dispatch(deleteStarted(id));

    return fetch(`api/v1/items/${id}`, init)
      .then((response) => {
        if (!response.ok) {
          return Promise.reject(new Error(`${response.status}: ${response.statusText}`));
        }
        return response;
      })
      .then(
        () => {
          dispatch(deleteSucceeded(id));
          return dispatch(deleteItem(id));
        },
        (error) => dispatch(deleteFailed(error)));
  };
};

export const fetchItems = () => {
  return function (dispatch: any) {
    dispatch(startFetchingItems());

    return fetch('api/v1/items')
      .then(
        (response) => {
          if (!response.ok) {
            return Promise.reject(new Error(`${response.status}: ${response.statusText}`));
          }
          return response.json();
        })
      .then(
        (json) => (dispatch(parseItems(json))),
        (error) => dispatch(fetchingFailed(error))
      ).then((parsedItems) => dispatch(fetchingSucceeded(parsedItems)));
  };
};
// endregion
