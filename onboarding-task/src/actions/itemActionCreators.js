import { ADD_ITEM, DELETE_ITEM, UPDATE_ITEM, TOGGLE_EDIT_ITEM } from './actionTypes.js';
import { generateId } from '../utils/idGenerator.js';

function addItem(text) {
  return {
    type: ADD_ITEM,
    id: generateId(),
    text,
  };
}

function deleteItem(id) {
  return {
    type: DELETE_ITEM,
    id,
  };
}

function updateItem(id, text) {
  return {
    type: UPDATE_ITEM,
    id,
    text,
  };
}

function toggleEditItem(id) {
  return {
    type: TOGGLE_EDIT_ITEM,
    id,
  };
}
