import {
  DELETE_ITEM_FAILURE,
  DELETE_ITEM_REQUEST,
  DELETE_ITEM_SUCCESS,
} from '../actionTypes';
import { Dispatch } from '../../types/Dispatch';
import { IAction } from '../IAction';
import { checkStatus } from '../../utils/ajaxUtils';
import { AsyncAction } from '../../types/AsyncAction';
import { Fetch } from '../../types/Fetch';

export const deleteItemRequest = (): IAction => {
  return {
    type: DELETE_ITEM_REQUEST,
    payload: {},
  };
};


export const deleteItemSuccess = (id: string): IAction => {
  return {
    type: DELETE_ITEM_SUCCESS,
    payload: {
      id
    },
  };
 };

export const deleteItemFailure = (errors: string[]): IAction => {
  return {
    type: DELETE_ITEM_FAILURE,
    payload: {
      errors
    },
  };
 };

const deleteItem = (fetch: Fetch, address: string, id: string) : AsyncAction => {
  return (dispatch: Dispatch) => {
    dispatch(deleteItemRequest());

    return fetch(`${address}/${id}`, {
      method: 'delete',
    })
      .then(checkStatus)
      .then(_ => dispatch(deleteItemSuccess(id)))
      .catch(errors => dispatch(deleteItemFailure(errors)));
  };
};

export const deleteItemFactory = (fetch: Fetch, address: string) => {
  return (id: string) => deleteItem(fetch, address, id);
};
