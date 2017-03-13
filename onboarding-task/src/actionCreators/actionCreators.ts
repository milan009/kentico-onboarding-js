import {
  DELETE_ITEM_FROM_LIST,
  UPDATE_TEXT_OF_ITEM,
  SWITCH_FORM_VISIBILITY_FOR_ITEM,
  FETCH_ITEMS_FAILURE,
  FETCH_ITEMS_REQUEST,
  FETCH_ITEMS_SUCCESS,
} from '../constants/actionTypes';
import { createListItemFactory } from './createListItemFactory';
import { createGuid } from '../utils/guidHelper';
import { IAction } from '../interfaces/IAction';

export const createListItem = createListItemFactory(createGuid);

export const switchFormVisibilityForListItem = (id: string): IAction => {
  return {
    type: SWITCH_FORM_VISIBILITY_FOR_ITEM,
    payload: {
      id,
    },
  };
};

export const updateListItem = (id: string, text: string): IAction => {
  return {
    type: UPDATE_TEXT_OF_ITEM,
    payload: {
      text,
      id,
    },
  };
};

export const deleteListItem = (id: string): IAction => {
  return {
    type: DELETE_ITEM_FROM_LIST,
    payload: {
      id,
    },
  };
};

export const fetchItemsRequest = (): IAction => {
  return {
    type: FETCH_ITEMS_REQUEST,
    payload: {},
  };
};

export const fetchItemsSuccess = (response: string): IAction => {
  return {
    type: FETCH_ITEMS_SUCCESS,
    payload: {
      response: response,
    },
  };
};

export const fetchItemsFailure = (response: string): IAction => {
  return {
    type: FETCH_ITEMS_FAILURE,
    payload: {
      response: response,
    },
  };
};
