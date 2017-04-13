import {
  PUT_ITEM_FAILURE, PUT_ITEM_REQUEST, PUT_ITEM_SUCCESS,
} from './actionTypes';
import { Dispatch } from '../types/Dispatch';
import { IAction } from './IAction';
import { IItem } from '../models/IItem';
import { checkStatus } from './checkStatus';
import { Item } from '../models/Item';
import { ActionAsync } from './ActionAsync';

require('es6-promise').polyfill();
require('isomorphic-fetch');

const putItemRequest = (): IAction => {
  return {
    type: PUT_ITEM_REQUEST,
    payload: {},
  };
};


const putItemSuccess = (item: IItem): IAction => {
  return {
    type: PUT_ITEM_SUCCESS,
    payload: {
      item
    },
  };
};

const putItemFailure = (errors: string[]): IAction => {
  return {
    type: PUT_ITEM_FAILURE,
    payload: {
      errors
    },
  };
};

export const putItem = (id: string, text: string) : ActionAsync => {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');

  return (dispatch: Dispatch) => {
    dispatch(putItemRequest());

    return fetch('api/v1/items', {
      method: 'put',
      body: JSON.stringify({id, text}),
      headers,
    })
      .then(checkStatus)
      .then(body => dispatch(putItemSuccess(new Item({...body}))))
      .catch(errors => dispatch(putItemFailure(errors)));
  };
};
