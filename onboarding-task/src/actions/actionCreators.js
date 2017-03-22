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
    value: {
      id,
      text,
    },
  };
};

export const deleteItem = (id) => {
  return {
    type: ITEM_DELETE,
    value: {
      id,
    },
  };
};

export const toggleEditItem = (id) => {
  return {
    type: ITEM_TOGGLE_EDIT,
    value: {
      id,
    },
  };
};
