import { ADD_ITEM } from '../actionTypes';

export const addItemFactory = (idGenerator) => (text) => ({
  text,
  id: idGenerator(),
  type: ADD_ITEM,
});
