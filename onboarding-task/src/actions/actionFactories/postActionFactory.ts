import {
  POST_ITEM_FAILURE,
  POST_ITEM_REQUEST,
  POST_ITEM_SUCCESS,
} from '../actionTypes';
import { Dispatch } from '../../types/Dispatch';
import { IAction } from '../IAction';
import { checkStatus } from '../../utils/ajaxUtils';
import { AsyncAction } from '../../types/AsyncAction';
import { Fetch } from '../../types/Fetch';
import { IItemServerModel } from '../../models/IItemServerModel';

export const postItemRequest = (): IAction => {
  return {
    type: POST_ITEM_REQUEST,
    payload: {},
  };
};


export const postItemSuccess = (item: IItemServerModel): IAction => {
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

const postItem = (fetch: Fetch, address: string, text: string) : AsyncAction => {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');

  return (dispatch: Dispatch) => {
    dispatch(postItemRequest());

    return fetch(address, {
      method: 'post',
      body: JSON.stringify({text}),
      headers,
    })
      .then(r => checkStatus<IItemServerModel>(r))
      .then((item: IItemServerModel) => dispatch(postItemSuccess(item)))
      .catch(errors => dispatch(postItemFailure(errors)));
  };
};

export const postItemFactory = (fetch: Fetch, address: string) => {
  return (text: string) => postItem(fetch, address, text);
};
