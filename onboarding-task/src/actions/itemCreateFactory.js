import {
  ITEM_CREATE,
} from './actionTypes';

const createItem = (idGenerator, text) => {
  return {
    type: ITEM_CREATE,
    payload: {
      id: idGenerator(),
      text,
    },
  };
};

export const createItemFactory = (idGenerator) => (text) => {
  return createItem(idGenerator, text);
};
