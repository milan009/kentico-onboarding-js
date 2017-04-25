import {
  GET_ITEMS_FAILURE,
  GET_ITEMS_REQUEST, GET_ITEMS_SUCCESS,
} from '../actionTypes';
import { Dispatch } from '../../types/Dispatch';
import { IAction } from '../IAction';
import { checkStatus } from '../../utils/ajaxUtils';
import { AsyncAction } from '../../types/AsyncAction';
import { Fetch } from '../../types/Fetch';
import { IItemServerModel } from '../../models/IItemServerModel';
import { IErrorResponse } from '../../models/IErrorResponse';

export const getItemsRequest = (): IAction => {
  return {
    type: GET_ITEMS_REQUEST,
    payload: {},
  };
};

export const getItemsSuccess = (items: IItemServerModel[]): IAction => {
  return {
    type: GET_ITEMS_SUCCESS,
    payload: {
      items
    },
  };
 };

export const getItemsFailure = (errors: IErrorResponse[]): IAction => {
  return {
    type: GET_ITEMS_FAILURE,
    payload: {
      errors
    },
  };
 };

const getItems = (fetch: Fetch, address: string) : AsyncAction => {
  return (dispatch: Dispatch) => {
    dispatch(getItemsRequest());

    return fetch(address)
      .then(r => checkStatus<IItemServerModel[]>(r))
       .then((content: IItemServerModel[]) => dispatch(getItemsSuccess(content)))
       .catch(errors => dispatch(getItemsFailure(errors)));
  };
};

export const getItemsFactory = (fetch: Fetch, address: string) => {
  return () => getItems(fetch, address);
};
