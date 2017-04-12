import { ADD_ITEM } from '../constants/actionTypes';

export const addItemFactory = (idGenerator: () => string) => (text: string) => ({
  type: ADD_ITEM,
  payload: { id: idGenerator(), text },
});
