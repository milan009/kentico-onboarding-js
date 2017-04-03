import {
  ITEM_DELETE,
  ITEM_UPDATE,
  ITEM_TOGGLE_EDIT,
} from './actionTypes';

import { generateUuid } from '../utils/idGenerator';
import { createItemFactory } from './createItemFactory';
import { IAction } from './IAction';

export const createItem = createItemFactory(generateUuid);

export const updateItem = (id: string, text: string) : IAction => {
  return {
    type: ITEM_UPDATE,
    payload: {
      id,
      text,
    },
  };
};

export const deleteItem = (id: string) : IAction => {
  return {
    type: ITEM_DELETE,
    payload: {
      id,
    },
  };
};

export const toggleEditItem = (id: string) : IAction => {
  return {
    type: ITEM_TOGGLE_EDIT,
    payload: {
      id,
    },
  };
};
