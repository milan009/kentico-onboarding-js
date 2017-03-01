import { generateGuid } from '../utils/generateGuid.js';
import { TOGGLE_EDIT_MODE, DELETE_ITEM, UPDATE_ITEM } from './actionTypes.js';
import { addItemFactory } from './actionDependencies/addItemFactory';

export const addItem = addItemFactory(generateGuid);

export const toggleEditMode = (guid) => ({
  type: TOGGLE_EDIT_MODE,
  payload: {
    guid,
  },
});

export const deleteItem = (guid) => ({
  type: DELETE_ITEM,
  payload: {
    guid,
  },
});

export const updateItem = (guid, text) => ({
  type: UPDATE_ITEM,
  payload: {
    text,
    guid,
  },
});
