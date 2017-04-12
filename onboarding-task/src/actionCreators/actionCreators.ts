import { DELETE_ITEM, ENABLE_EDIT_ITEM, SAVE_CHANGES_TO_ITEM, CANCEL_CHANGES_TO_ITEM } from '../constants/actionTypes';
import { addItemFactory } from './addItemFactory';
import { createGuid } from '../utils/guidHelper';

export const addItem = addItemFactory(createGuid);

export const deleteItem = (id: string) => ({
  type: DELETE_ITEM,
  payload: { id },
});

export const enableEditItem = (id: string) => ({
  type: ENABLE_EDIT_ITEM,
  payload: { id },
});

export const saveChangesToItem = (id: string, text: string) => ({
  type: SAVE_CHANGES_TO_ITEM,
  payload: { id, text },
});

export const cancelChangesToItem = (id: string) => ({
  type: CANCEL_CHANGES_TO_ITEM,
  payload: { id },
});
