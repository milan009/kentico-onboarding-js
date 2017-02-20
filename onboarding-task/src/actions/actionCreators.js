/**
 * Created by IvanJ on 13.2.2017.
 */
import { generateGuid } from '../utils/generateGuid.js';
import { ADD_ITEM, TOGGLE_EDIT_MODE, DELETE_ITEM, UPDATE_ITEM } from './actionTypes.js';

export const addItem = (text) => ({
  type: ADD_ITEM,
  payload: {
    guid: generateGuid(),
    isEdited: false,
    text,
  },
});

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
