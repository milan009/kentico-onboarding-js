import { ITEM_ADDED, ITEM_DELETED, ITEM_SAVED, START_EDITING_ITEM, STOP_EDITING_ITEM, UPDATE_ITEM_TEXT } from './actionTypes';
import { generateGuid } from '../utils/guidGenerator';
export const addItem = (text) => (
  {
    type: ITEM_ADDED,
    text,
    id: generateGuid(),
  }
);

export const saveItem = (id, text) => (
  {
    type: ITEM_SAVED,
    id,
    text,
  }
);

export const deleteItem = (id) => (
  {
    type: ITEM_DELETED,
    id,
  }
);

export const startEditingItem = (id) => (
  {
    type: START_EDITING_ITEM,
    id,
  }
);

export const stopEditingItem = (id) => (
  {
    type: STOP_EDITING_ITEM,
    id,
  }
);

export const updateItemText = (id, text) => (
  {
    type: UPDATE_ITEM_TEXT,
    id,
    text,
  }
);

