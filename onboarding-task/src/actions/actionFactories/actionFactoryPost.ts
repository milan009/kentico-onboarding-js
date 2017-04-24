import {
  POST_ITEM_FAILURE,
  POST_ITEM_REQUEST,
  POST_ITEM_SUCCESS,
} from '../actionTypes';
import { Dispatch } from '../../types/Dispatch';
import { IAction } from '../IAction';
import { IItem } from '../../models/IItem';
import { checkStatus } from '../../utils/ajaxUtils';
import { ActionAsync } from '../ActionAsync';
import { Fetch } from '../Fetch';

export const postItemRequest = (): IAction => {
  return {
    type: POST_ITEM_REQUEST,
    payload: {},
  };
};


export const postItemSuccess = (item: IItem): IAction => {
  return {
    type: POST_ITEM_SUCCESS,
    payload: {
      item
    },
  };
 };

export const postItemFailure = (errors: string[]): IAction => {
  return {
    type: POST_ITEM_FAILURE,
    payload: {
      errors
    },
  };
 };

const postItem = (fetch: Fetch, address: string, text: string) : ActionAsync => {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');

  return (dispatch: Dispatch) => {
    dispatch(postItemRequest());

    return fetch(address, {
      method: 'post',
      body: JSON.stringify({text}),
      headers,
    })
      .then(checkStatus)
      .then(item => dispatch(postItemSuccess(item)))
      .catch(errors => dispatch(postItemFailure(errors)));
  };
};

export const postItemFactory = (fetch: Fetch, address: string) => {
  return (text: string) => postItem(fetch, address, text);
};
