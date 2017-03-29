import * as fetch from 'isomorphic-fetch';
import { DELETE_ITEM, UPDATE_ITEM } from './actionTypes';
import { generateId } from '../utils/idGenerator';
import { addItemFactory } from './addItemFactory';
import { IAction } from './IAction';
import { fetchItemsFactory } from './fetchItemsFactory';

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
const addItemWithDependencies = addItemFactory(generateId);
export { deleteItem, updateItem, addItemWithDependencies as addItem, fetchItemsWithDependecies as fetchItems };
