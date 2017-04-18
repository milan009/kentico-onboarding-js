import { getItemsFactory } from './actionFactories/actionFactoryGet';
require('es6-promise').polyfill();
import * as fetch from 'isomorphic-fetch';
import { deleteItemFactory } from './actionFactories/actionFactoryDelete';
import { postItemFactory } from './actionFactories/actionFactoryPost';
import { putItemFactory } from './actionFactories/actionFactoryPut';

export const getItems = getItemsFactory(fetch, 'api/v1/items');
export const deleteItem = deleteItemFactory(fetch, 'api/v1/items');
export const postItem = postItemFactory(fetch, 'api/v1/items');
export const putItem = putItemFactory(fetch, 'api/v1/items');
