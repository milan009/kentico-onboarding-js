import { ADD_ITEM, DELETE_ITEM, UPDATE_ITEM, TOGGLE_EDIT_ITEM } from './actionTypes.js';
import { generateId } from '../utils/idGenerator.js';

// do not export this one
function addItem(text, generateNewId) {
  return {
    type: ADD_ITEM,
    payload: {
      id: generateNewId(),
      text,
    },
  };
}

function addItemFunctionCreator(idGenerator) {
  return (text) => addItem(text, idGenerator);
}

function deleteItem(id) {
  return {
    type: DELETE_ITEM,
    payload: {
      id,
    },
  };
}

function updateItem(id, text) {
  return {
    type: UPDATE_ITEM,
    payload: {
      id,
      text,
    },
  };
}

function toggleEditItem(id) {
  return {
    type: TOGGLE_EDIT_ITEM,
    payload: {
      id,
    },
  };
}

const addItemWithDependencies = addItemFunctionCreator(generateId);
export { addItemFunctionCreator, deleteItem, updateItem, toggleEditItem, addItemWithDependencies as addItem };
