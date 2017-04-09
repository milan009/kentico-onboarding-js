import { DELETE_ITEM, EDIT_ITEM, SAVE_CHANGES_TO_ITEM, CANCEL_CHANGES_TO_ITEM } from '../constants/actionTypes.js';
import { addItemFactory } from './addItemFactory';
import { createGuid } from '../utils/guidHelper.js';

export const addItem = addItemFactory(createGuid);

export const deleteItem = (id) => {
  return { type: DELETE_ITEM, payload: { id } };
};

export const editItem = (id) => {
  return { type: EDIT_ITEM, payload: { id } };
};

export const saveChangesToItem = (id, text) => {
  return { type: SAVE_CHANGES_TO_ITEM, payload: { id, text } };
};

export const cancelChangesToItem = (id) => {
  return { type: CANCEL_CHANGES_TO_ITEM, payload: { id } };
};
