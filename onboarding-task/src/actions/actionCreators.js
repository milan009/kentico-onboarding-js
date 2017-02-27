/**
 * Created by IvanJ on 13.2.2017.
 */
import { generateGuid } from '../utils/generateGuid.js';
import { ADD_ITEM, TOGGLE_EDIT_MODE, DELETE_ITEM, UPDATE_ITEM } from './actionTypes.js';

const addItem = (text, guidGenerator) => ({
  type: ADD_ITEM,
  payload: {
    guid: guidGenerator(),
    isEdited: false,
    text,
  },
});

export function addItemFactory(guidGenerator) {
  return (text) => addItem(text, guidGenerator);
}

const addItemWithInjectedDependencies = addItemFactory(generateGuid);

export { addItemWithInjectedDependencies as addItem };

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
