import { Dispatch } from 'redux';
import * as uuidV4 from 'uuid';
import { Promise } from 'es6-promise';

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
  PARSE_RESPONSE_FINISHED,
  PARSE_RESPONSE_STARTED,
} from './actionTypes';
import { IStore } from '../interfaces/IStore';

import { ItemsDataMap } from '../reducers/list/itemsReducer';
import { OrderedMap } from 'immutable';
import { ItemData } from '../models/ItemData';

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

export const parseItems = (json: any) => {
    return function (dispatch: Dispatch<IStore>) {
      dispatch(parsingStarted(json));

      return parseAPIResponseJson(json)
        .then((parsedItems: any) => dispatch(parsingFinished(parsedItems)));
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
