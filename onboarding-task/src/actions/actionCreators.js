import {
  ITEM_CREATE,
  ITEM_DELETE,
  ITEM_UPDATE,
  ITEM_TOGGLE_EDIT,
} from './actionCreators';

import { generateUuid } from '../utils/idGenerator.js';

export const createItem = (text) => {
  return {
    type: ITEM_CREATE,
    value: {
      id: generateUuid(),
      text,
    },
  };
};

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
