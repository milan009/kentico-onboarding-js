import { DELETE_ITEM, UPDATE_ITEM } from './actionTypes';
import { generateId } from '../utils/idGenerator';
import { addItemFactory } from './addItemFactory';
import { IAction } from './IAction';

function deleteItem(id: string): IAction {
  return {
    type: DELETE_ITEM,
    payload: {
      id,
    },
  };
}

function updateItem(id: string, text: string): IAction {
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
