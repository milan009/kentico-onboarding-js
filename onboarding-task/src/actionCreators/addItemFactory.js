import { ADD_ITEM } from '../constants/actionTypes';

export const addItemFactory = (idGenerator) => (text) => ({
  text,
  id: idGenerator(),
  type: ADD_ITEM,
});
