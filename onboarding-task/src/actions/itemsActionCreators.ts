import { v4 } from 'uuid';
import * as fetch from 'isomorphic-fetch';
import { DELETE_ITEM, UPDATE_ITEM } from './actionTypes';
import { IAction } from './IAction';
import { failFetchItemsFactory, fetchItemsFactory} from './fetchItemsFactory';
import { postItemFactory } from './postItemFactory';
import { createErrorMessage } from './errorMessageActionCreators';

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

const apiBaseUrl = process.env.NODE_ENV === 'development' ? '/api/v1/items' : 'http://pavelf-list-app.azurewebsites.net/api/v1/items';

const failFetchItems = failFetchItemsFactory(v4);
const fetchItemsWithDependencies = fetchItemsFactory(fetch, apiBaseUrl, failFetchItems);
const postItemWithDependencies = postItemFactory(fetch, apiBaseUrl, createErrorMessage);

export { deleteItem, updateItem, failFetchItems, fetchItemsWithDependencies as fetchItems, postItemWithDependencies as postItem };
