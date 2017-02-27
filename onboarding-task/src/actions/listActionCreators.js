import { DELETE_ITEM, UPDATE_ITEM } from './actionTypes.js';
import { generateId } from '../utils/idGenerator.js';
import { addItemFactory } from './addItemFactory.js';

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

const addItemWithDependencies = addItemFactory(generateId);
export { deleteItem, updateItem, addItemWithDependencies as addItem };
