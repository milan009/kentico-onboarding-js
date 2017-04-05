import { DELETE_ITEM, EDIT_ITEM, SAVE_CHANGES_TO_ITEM, CANCEL_CHANGES_TO_ITEM } from '../actionTypes.js';
import { addItemFactory } from './addItemFactory';
import { createGuid } from '../utils/guidHelper.js';

export const addItem = addItemFactory(createGuid);

export const deleteItem = (id) => {
  return { type: DELETE_ITEM, id };
};

export const editItem = (id) => {
  return { type: EDIT_ITEM, id };
};

export const saveChangesToItem = (id, text) => {
  return { type: SAVE_CHANGES_TO_ITEM, text, id };
};

export const cancelChangesToItem = (id) => {
  return { type: CANCEL_CHANGES_TO_ITEM, id };
};
