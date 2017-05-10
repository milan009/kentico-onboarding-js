import {
  ITEM_DELETED,
  ITEM_SAVED,
  START_EDITING_ITEM,
  STOP_EDITING_ITEM,
  UPDATE_ITEM_TEXT,
} from './actionTypes';
import { generateGuid } from '../utils/guidGenerator';
import { addItemFactory } from './actionCreatorsFactory';

export const addItem = addItemFactory(generateGuid);

export const saveItem = (id, text) => (
  {
    type: ITEM_SAVED,
    payload: {
      id,
      text,
    },
  }
);

export const deleteItem = (id) => (
  {
    type: ITEM_DELETED,
    payload: {
      id,
    },
  }
);

export const startEditingItem = (id) => (
  {
    type: START_EDITING_ITEM,
    payload: {
      id,
    },
  }
);

export const stopEditingItem = (id) => (
  {
    type: STOP_EDITING_ITEM,
    payload: {
      id,
    },
  }
);

export const updateItemText = (id, text) => (
  {
    type: UPDATE_ITEM_TEXT,
    payload: {
      id,
      text,
    },
  }
);

