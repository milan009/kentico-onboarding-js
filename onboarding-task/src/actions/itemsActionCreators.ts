import { getItemsFactory } from './actionFactories/getActionFactory';
import * as fetch from 'isomorphic-fetch';
require('es6-promise').polyfill();
import { deleteItemFactory } from './actionFactories/deleteActionFactory';
import { postItemFactory } from './actionFactories/postActionFactory';
import { putItemFactory } from './actionFactories/putActionFactory';
import { ITEM_TOGGLE_EDIT } from './actionTypes';
import { IAction } from './IAction';
import { ENDPOINT_URL } from '../utils/urlAdresses';

export const toggleEditItem = (id: string) : IAction => {
  return {
    type: ITEM_TOGGLE_EDIT,
    payload: {
      id,
    },
  };
};

export const getItems = getItemsFactory(fetch, ENDPOINT_URL);
export const deleteItem = deleteItemFactory(fetch, ENDPOINT_URL);
export const postItem = postItemFactory(fetch, ENDPOINT_URL);
export const putItem = putItemFactory(fetch, ENDPOINT_URL);
