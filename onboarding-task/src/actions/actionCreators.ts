import {
  TOGGLE_EDIT_MODE,
  DELETE_ITEM,
  UPDATE_ITEM_TEXT,
  FETCH_ITEMS_REQUEST,
  FETCH_ITEMS_SUCCESS,
  FETCH_ITEMS_FAILURE,
  POST_ITEM_SUCCESS, POST_ITEM_FAILURE, DELETE_ERROR
} from './actionTypes';
import { IAction } from './IAction';
import { IItemServerModel } from '../models/IItemServerModel';
import * as fetch from 'isomorphic-fetch';
import { fetchItemsFactory } from './actionDependencies/fetchItemsFactory';
import { postItemFactory } from './actionDependencies/postItemFactory';


export const toggleEditMode = (guid: string) : IAction => ({
  type: TOGGLE_EDIT_MODE,
  payload: {
    guid,
  },
});

export const deleteItem = (guid: string) : IAction => ({
  type: DELETE_ITEM,
  payload: {
    guid,
  },
});

export const updateItemText = (guid: string, text: string) : IAction => ({
  type: UPDATE_ITEM_TEXT,
  payload: {
    guid,
    text,
  },
});

export const fetchItemsRequest = () : IAction => ({
  type: FETCH_ITEMS_REQUEST,
});

export const fetchItemsSuccess = (json: IItemServerModel[]) : IAction => ({
  type: FETCH_ITEMS_SUCCESS,
  payload: {
    items: json,
  },
});

export const fetchItemsFailure = (error: Error) : IAction => ({
  type: FETCH_ITEMS_FAILURE,
  payload: {
    error,
  },
});

export const fetchItems = fetchItemsFactory(fetch);

export const postItemSuccess = (json: IItemServerModel) : IAction => ({
  type: POST_ITEM_SUCCESS,
  payload: {
    item: json,
  },
});

export const postItemFailure = (error: Error) : IAction => ({
  type: POST_ITEM_FAILURE,
  payload: {
    error,
  },
});

export const postItem = postItemFactory(fetch);

export const deleteError = (guid: number) : IAction => ({
  type: DELETE_ERROR,
  payload: {
    guid,
  },
});



