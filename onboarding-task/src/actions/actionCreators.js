import {
  ITEM_DELETE,
  ITEM_UPDATE,
  ITEM_TOGGLE_EDIT,
} from './actionTypes';

import { generateUuid } from '../utils/idGenerator.js';
import { createItemFactory } from './itemCreateFactory.js';

export const createItem = createItemFactory(generateUuid);

export const updateItem = (id, text) => {
  return {
    type: ITEM_UPDATE,
    payload: {
      id,
      text,
    },
  };
};

export const deleteItem = (id) => {
  return {
    type: ITEM_DELETE,
    payload: {
      id,
    },
  };
};

export const toggleEditItem = (id) => {
  return {
    type: ITEM_TOGGLE_EDIT,
    payload: {
      id,
    },
  };
};
