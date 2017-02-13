/**
 * Created by IvanJ on 13.2.2017.
 */
import { generateGuid } from '../utils/utils.js';
import {ADD_ITEM, TOGGLE_EDIT_MODE, DELETE_ITEM, UPDATE_ITEM} from './actionTypes.js';

export const addItem = (text) => ({
  type: ADD_ITEM,
  guid: generateGuid(),
  isEdited: false,
  text,
});

export const toggleEditMode = (guid) => ({
  type: TOGGLE_EDIT_MODE,
  guid,
});

export const deleteItem = (guid) => ({
  type: DELETE_ITEM,
  guid,
});

export const updateItem = (guid, text) => ({
  type: UPDATE_ITEM,
  text,
  guid,
});



