import * as uuidV4 from 'uuid';
import * as fetch from 'isomorphic-fetch';

import { ThunkAction } from '../interfaces/IAction';
import { ItemData } from '../models/ItemData';
import { deleteStoredItemFactory } from './thunkFactories/deleteItemThunkFactory';
import { getItemsFactory } from './thunkFactories/fetchItemsThunkFactory';
import { postNewItemFactory } from './thunkFactories/createItemThunkFactory';
import { putSavedItemFactory } from './thunkFactories/updateItemThunkFactory';

export const deleteStoredItem: (id: string) => ThunkAction = deleteStoredItemFactory({
  fetch,
  deleteThunkActionFactory: deleteStoredItemFactory,
});

export const getItems: () => ThunkAction = getItemsFactory({
  fetch,
  getThunkActionFactory: getItemsFactory,
});

export const postNewItem: (newText: string) => ThunkAction = postNewItemFactory({
  fetch,
  optimisticUpdatedGenerator: uuidV4,
  postThunkActionFactory: postNewItemFactory
});

export const putSavedItem: (item: ItemData) => ThunkAction = putSavedItemFactory({
  fetch,
  putThunkActionFactory: putSavedItemFactory,
});
