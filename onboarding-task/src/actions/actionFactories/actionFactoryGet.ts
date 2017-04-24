import {
  GET_ITEMS_FAILURE,
  GET_ITEMS_REQUEST, GET_ITEMS_SUCCESS,
} from '../actionTypes';
import { Dispatch } from '../../types/Dispatch';
import { IAction } from '../IAction';
import { checkStatus } from '../../utils/ajaxUtils';
import { IItem } from '../../models/IItem';
import { ActionAsync } from '../ActionAsync';
import { Fetch } from '../Fetch';

export const getItemsRequest = (): IAction => {
  return {
    type: GET_ITEMS_REQUEST,
    payload: {},
  };
};

export const getItemsSuccess = (items: IItem[]): IAction => {
  return {
    type: GET_ITEMS_SUCCESS,
    payload: {
      items
    },
  };
 };

export const getItemsFailure = (errors: string[]): IAction => {
  return {
    type: GET_ITEMS_FAILURE,
    payload: {
      errors
    },
  };
 };

const getItems = (fetch: Fetch, address: string) : ActionAsync => {
  return (dispatch: Dispatch) => {
    dispatch(getItemsRequest());

    return fetch(address)
      .then(checkStatus)
     .then(content => dispatch(getItemsSuccess(content)))
     .catch(errors => dispatch(getItemsFailure(errors)));
  };
};

export const getItemsFactory = (fetch: Fetch, address: string) => {
  return () => getItems(fetch, address);
};
