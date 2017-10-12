import { Dispatch } from 'redux';
import { Promise } from 'es6-promise';
import { OrderedMap } from 'immutable';

import { IAction, ThunkAction } from '../interfaces/IAction';
import {
  ITEM_CHANGE_CANCELLED,
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
import { IItemDTO } from '../interfaces/IItemDTO';

// region Frontend related action creators

export const cancelChange = (id: string): IAction => ({
  type: ITEM_CHANGE_CANCELLED,
  payload: {id},
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

export const fetchingFailed = (error: Error, action: ThunkAction): IAction => ({
  type: FETCH_FAIL,
  payload: {
    displayList: false,
    error,
    action,
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

export const postStarted = (optimisticId: string, text: string): IAction => ({
  type: POST_REQUEST_STARTED,
  payload: {
    text,
    optimisticId,
  }
});

export const postSucceeded = (formerId: string, json: any): IAction => ({
  type: POST_REQUEST_SUCCESS,
  payload: {
    item: json,
    formerId,
  },
});

export const postFailed = (error: Error, action: ThunkAction): IAction => ({
  type: POST_REQUEST_FAIL,
  payload: {
    displayList: true,
    error,
    action,
  }
});

// endregion

// region PUT related action creators

export const putStarted = (item: ItemData): IAction => ({
  type: PUT_REQUEST_STARTED,
  payload: {
    id: item.id,
    item,
  }
});

export const putSucceeded = (json: any): IAction => ({
  type: PUT_REQUEST_SUCCESS,
  payload: {
    id: json.id,
    item: json,
  },
});

export const putFailed = (error: Error, action: ThunkAction): IAction => ({
  type: PUT_REQUEST_FAIL,
  payload: {
    displayList: true,
    error,
    action
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

export const deleteFailed = (error: Error, action: ThunkAction): IAction => ({
  type: DELETE_REQUEST_FAIL,
  payload: {
    displayList: true,
    error,
    action
  }
});

// endregion

const parseAPIResponseJson = (json: any) => {
  return new Promise<ItemsDataMap>((resolve) => {
    let parsedItems = OrderedMap<string, ItemData>();
    json.map((item: IItemDTO) => {
      parsedItems = parsedItems.set(item.id, new ItemData(item));
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
// endregion
