import * as uuidV4 from 'uuid';
import * as fetch from 'isomorphic-fetch';

import { ThunkAction } from '../interfaces/IAction';
import { ItemData } from '../models/ItemData';
import { deleteItemThunkFactory } from './thunkFactories/deleteItemThunkFactory';
import { fetchItemsThunkFactory } from './thunkFactories/fetchItemsThunkFactory';
import { postItemThunkFactory } from './thunkFactories/createItemThunkFactory';
import { updateItemThunkFactory } from './thunkFactories/updateItemThunkFactory';

export { cancelChange, makeEditable } from './actionCreators';

export const deleteItemThunk: (id: string) => ThunkAction = deleteItemThunkFactory({
  fetch,
  deleteThunkActionFactory: deleteItemThunkFactory,
});

export const fetchItemsThunk: () => ThunkAction = fetchItemsThunkFactory({
  fetch,
  getThunkActionFactory: fetchItemsThunkFactory,
});

export const createItemThunk: (newText: string) => ThunkAction = postItemThunkFactory({
  fetch,
  optimisticUpdatedGenerator: uuidV4,
  postThunkActionFactory: postItemThunkFactory
});

export const updateItemThunk: (item: ItemData) => ThunkAction = updateItemThunkFactory({
  fetch,
  putThunkActionFactory: updateItemThunkFactory,
});
