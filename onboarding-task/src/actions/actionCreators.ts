import { generateGuid } from '../utils/generateGuid';
import {
  TOGGLE_EDIT_MODE,
  DELETE_ITEM,
  UPDATE_ITEM_TEXT,
  FETCH_ITEMS_REQUEST,
  FETCH_ITEMS_SUCCESS,
  FETCH_ITEMS_FAILURE
} from './actionTypes';
import { addItemFactory } from './actionDependencies/addItemFactory';
import { IAction } from './IAction';
import {IItemServerModel} from '../models/IItemServerModel';
import * as fetch from 'isomorphic-fetch';
import { fetchItemsFactory } from './actionDependencies/fetchItemsFactory';

export const addItem = addItemFactory(generateGuid);

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
    text,
    guid,
  },
});

export const fetchItemsRequest = () : IAction => ({
  type: FETCH_ITEMS_REQUEST,
});

export const fetchItemsSuccess = (json: IItemServerModel[]) : IAction => ({
  type: FETCH_ITEMS_SUCCESS,
  payload: {
    items: json,
  }
});

export const fetchItemsFailure = (error: Error) : IAction => ({
  type: FETCH_ITEMS_FAILURE,
  payload: {
    error
  },
});

export const fetchItems = fetchItemsFactory(fetch);

