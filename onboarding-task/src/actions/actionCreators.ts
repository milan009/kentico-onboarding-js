import { generateGuid } from '../utils/generateGuid.js';
import { TOGGLE_EDIT_MODE, DELETE_ITEM, UPDATE_ITEM_TEXT } from './actionTypes';
import { addItemFactory } from './actionDependencies/addItemFactory';
import { IItemAction } from '../interfaces/IItemAction';

export const addItem = addItemFactory(generateGuid);

export const toggleEditMode = (guid: string) : IItemAction => ({
  type: TOGGLE_EDIT_MODE,
  payload: {
    guid,
  },
});

export const deleteItem = (guid: string) : IItemAction => ({
  type: DELETE_ITEM,
  payload: {
    guid,
  },
});

export const updateItemText = (guid: string, text: string) : IItemAction => ({
  type: UPDATE_ITEM_TEXT,
  payload: {
    text,
    guid,
  },
});

