import * as fetch from 'isomorphic-fetch';
import { DELETE_ITEM, UPDATE_ITEM } from './actionTypes';
import { IAction } from './IAction';
import { fetchItemsFactory } from './fetchItemsFactory';
import { postItemFactory } from './postItemFactory';

function deleteItem(id: string): IAction {
  return {
    type: DELETE_ITEM,
    payload: {
      id,
    },
  };
}

function updateItem(id: string, text: string): IAction {
  return {
    type: UPDATE_ITEM,
    payload: {
      id,
      text,
    },
  };
}

const fetchItemsWithDependecies = fetchItemsFactory(fetch, '/api/v1/items');
const postItemWithDependecies = postItemFactory(fetch, '/api/v1/items');
export { deleteItem, updateItem, fetchItemsWithDependecies as fetchItems, postItemWithDependecies as postItem };
