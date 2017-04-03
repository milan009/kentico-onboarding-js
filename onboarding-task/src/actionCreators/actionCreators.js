import * as actionTypes from '../actionTypes.js';
import { createGuid } from '../utils/guidHelper.js';

export const addItem = (text) => {
  const id = createGuid();
  return { type: actionTypes.ADD_ITEM, text, id };
}

export function deleteItem(id) {
  return { type: actionTypes.DELETE_ITEM, id };
}

export function editItem(id) {
  return { type: actionTypes.EDIT_ITEM, id };
}

export function saveChangesToItem(text, id) {
  return { type: actionTypes.SAVE_CHANGES_TO_ITEM, text, id };
}

export function cancelChangesToItem(id) {
  return { type: actionTypes.CANCEL_CHANGES_TO_ITEM, id };
}
