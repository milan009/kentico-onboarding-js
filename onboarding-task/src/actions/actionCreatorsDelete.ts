import {
  DELETE_ITEM_FAILURE,
  DELETE_ITEM_REQUEST,
  DELETE_ITEM_SUCCESS,
} from './actionTypes';
import { Dispatch } from '../types/Dispatch';
import { IAction } from './IAction';
import { checkStatus } from './checkStatus';

require('es6-promise').polyfill();
require('isomorphic-fetch');

const deleteItemRequest = (): IAction => {
  return {
    type: DELETE_ITEM_REQUEST,
    payload: {},
  };
};


 const deleteItemSuccess = (id: string): IAction => {
  return {
    type: DELETE_ITEM_SUCCESS,
    payload: {
      id
    },
  };
 };

 const deleteItemFailure = (errors: string[]): IAction => {
  return {
    type: DELETE_ITEM_FAILURE,
    payload: {
      errors
    },
  };
 };

export const deleteItem = (id: string) => {
  return (dispatch: Dispatch) => {
    dispatch(deleteItemRequest());

    return fetch(`api/v1/items/${id}`, {
      method: 'delete',
    })
      .then(checkStatus)
      .then(_ => dispatch(deleteItemSuccess(id)))
      .catch(errors => dispatch(deleteItemFailure(errors)));
  };
};
