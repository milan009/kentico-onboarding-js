import {
  GET_ITEMS_FAILURE,
  GET_ITEMS_REQUEST, GET_ITEMS_SUCCESS,
} from './actionTypes';
import { Dispatch } from '../types/Dispatch';
import { IAction } from './IAction';
import { checkStatus } from './checkStatus';
import { IItem } from '../models/IItem';

require('es6-promise').polyfill();
require('isomorphic-fetch');

const getItemsRequest = (): IAction => {
  return {
    type: GET_ITEMS_REQUEST,
    payload: {},
  };
};

 const getItemsSuccess = (items: IItem[]): IAction => {
  return {
    type: GET_ITEMS_SUCCESS,
    payload: {
      items
    },
  };
 };

 const getItemsFailure = (errors: string[]): IAction => {
  return {
    type: GET_ITEMS_FAILURE,
    payload: {
      errors
    },
  };
 };

export const getItems = () => {
  return (dispatch: Dispatch) => {
    dispatch(getItemsRequest());

    return fetch('api/v1/items')
      .then(checkStatus)
     .then(content => dispatch(getItemsSuccess(content)))
     .catch(errors => dispatch(getItemsFailure(errors)));
  };
};
