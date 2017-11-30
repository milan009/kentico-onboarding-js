import { IAction, ThunkAction } from '../interfaces/IAction';
import {
  ITEM_CHANGE_CANCELLED,
  ITEM_MAKE_EDITABLE,

  FETCH_REQUEST_STARTED,
  FETCH_REQUEST_SUCCESS,
  FETCH_REQUEST_FAIL,

  CREATE_REQUEST_FAIL,
  CREATE_REQUEST_STARTED,
  CREATE_REQUEST_SUCCESS,

  DELETE_REQUEST_FAIL,
  DELETE_REQUEST_SUCCESS,
  DELETE_REQUEST_STARTED,

  UPDATE_REQUEST_FAIL,
  UPDATE_REQUEST_SUCCESS,
  UPDATE_REQUEST_STARTED,
} from './actionTypes';
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

export const fetchItemsStarted = (): IAction => ({
  type: FETCH_REQUEST_STARTED,
});

export const fetchItemsSucceeded = (items: IItemDTO[]): IAction => ({
  type: FETCH_REQUEST_SUCCESS,
  payload: {
    items,
  },
});

export const fetchItemsFailed = (error: Error, retryAction: ThunkAction): IAction => ({
  type: FETCH_REQUEST_FAIL,
  payload: {
    error,
    retryAction,
  }
});

// endregion

// region POST related action creators

export const createItemStarted = (optimisticId: string, text: string): IAction => ({
  type: CREATE_REQUEST_STARTED,
  payload: {
    text,
    optimisticId,
  }
});

export const createItemSucceeded = (formerId: string, item: IItemDTO): IAction => ({
  type: CREATE_REQUEST_SUCCESS,
  payload: {
    item,
    formerId,
  },
});

export const createItemFailed = (id: string, error: Error, retryAction: ThunkAction): IAction => ({
  type: CREATE_REQUEST_FAIL,
  payload: {
    id,
    error,
    retryAction,
  }
});

// endregion

// region PUT related action creators

export const updateItemStarted = (item: ItemData): IAction => ({
  type: UPDATE_REQUEST_STARTED,
  payload: {
    id: item.id,
    item,
  }
});

export const updateItemSucceeded = (item: IItemDTO): IAction => ({
  type: UPDATE_REQUEST_SUCCESS,
  payload: {
    id: item.id,
    item,
  },
});

export const updateItemFailed = (id: string, error: Error, retryAction: ThunkAction): IAction => ({
  type: UPDATE_REQUEST_FAIL,
  payload: {
    id,
    error,
    retryAction
  }
});

// endregion

// region DELETE related action creators

export const deleteItemStarted = (id: string): IAction => ({
  type: DELETE_REQUEST_STARTED,
  payload: {
    id,
  }
});

export const deleteItemSucceeded = (id: string): IAction => ({
  type: DELETE_REQUEST_SUCCESS,
  payload: {
    id
  },
});

export const deleteItemFailed = (id: string, error: Error, retryAction: ThunkAction): IAction => ({
  type: DELETE_REQUEST_FAIL,
  payload: {
    id,
    error,
    retryAction
  }
});

// endregion
