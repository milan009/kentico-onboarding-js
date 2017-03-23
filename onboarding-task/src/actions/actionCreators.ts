import {ITEM_CREATED, ITEM_VIEW_MODE_TOGGLED, ITEM_EDITED, ITEM_DELETED} from './actionTypes';

const createItem = (id: string, value: string) => {
  return { type: ITEM_CREATED, id, value }
};

const createItemFlags = (id: string) => {
  return { type: ITEM_CREATED, id }
};

const deleteItem = (id: string) => {
  return { type: ITEM_DELETED, id }
};

const editItem = (id: string, value: string) => {
  return { type: ITEM_EDITED, id, value }
};

const toggleItemViewMode = (id: string) => {
  return { type: ITEM_VIEW_MODE_TOGGLED, id: id }
};

export { createItem, deleteItem, editItem, toggleItemViewMode, createItemFlags };
