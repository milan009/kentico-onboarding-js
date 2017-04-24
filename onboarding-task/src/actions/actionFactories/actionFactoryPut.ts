import {
  PUT_ITEM_FAILURE, PUT_ITEM_REQUEST, PUT_ITEM_SUCCESS,
} from '../actionTypes';
import { Dispatch } from '../../types/Dispatch';
import { IAction } from '../IAction';
import { IItem } from '../../models/IItem';
import { checkStatus } from '../../utils/ajaxUtils';
import { ActionAsync } from '../ActionAsync';
import { Fetch } from '../Fetch';

export const putItemRequest = (): IAction => {
  return {
    type: PUT_ITEM_REQUEST,
    payload: {},
  };
};


export const putItemSuccess = (item: IItem): IAction => {
  return {
    type: PUT_ITEM_SUCCESS,
    payload: {
      item
    },
  };
};

export const putItemFailure = (errors: string[]): IAction => {
  return {
    type: PUT_ITEM_FAILURE,
    payload: {
      errors
    },
  };
};

const putItem = (fetch: Fetch, address: string, id: string, text: string) : ActionAsync => {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');

  return (dispatch: Dispatch) => {
    dispatch(putItemRequest());

    return fetch(address, {
      method: 'put',
      body: JSON.stringify({id, text}),
      headers,
    })
      .then(checkStatus)
      .then(body => dispatch(putItemSuccess(body)))
      .catch(errors => dispatch(putItemFailure(errors)));
  };
};

export const putItemFactory = (fetch: Fetch, address: string) => {
  return (id: string, text: string) => putItem(fetch, address, id, text);
};
