import { DELETE_ITEM, ENABLE_EDIT_ITEM, SAVE_CHANGES_TO_ITEM, CANCEL_CHANGES_TO_ITEM } from '../constants/actionTypes.js';
import { addItemFactory } from './addItemFactory';
import { createGuid } from '../utils/guidHelper.js';

export const addItem = addItemFactory(createGuid);

export const deleteItem = (id) => ({
  type: DELETE_ITEM, payload: { id },
});

export const enableEditItem = (id) => ({
  type: ENABLE_EDIT_ITEM, payload: { id },
});

export const saveChangesToItem = (id, text) => ({
  type: SAVE_CHANGES_TO_ITEM, payload: { id, text },
});

export const cancelChangesToItem = (id) => ({
  type: CANCEL_CHANGES_TO_ITEM, payload: { id },
});
