import { generateGuid } from '../utils/generateGuid.js';
import { TOGGLE_EDIT_MODE, DELETE_ITEM, UPDATE_ITEM_TEXT } from './actionTypes';
import { addItemFactory } from './actionDependencies/addItemFactory';

export const addItem = addItemFactory(generateGuid);

export const toggleEditMode = (guid: string) => ({
  type: TOGGLE_EDIT_MODE,
  payload: {
    guid,
  },
});

export const deleteItem = (guid: string) => ({
  type: DELETE_ITEM,
  payload: {
    guid,
  },
});

export const updateItemText = (guid: string, text: string) => ({
  type: UPDATE_ITEM_TEXT,
  payload: {
    text,
    guid,
  },
});

export interface IItemAction {
  type: string;
  payload?: IPayload | any;

}

export interface IPayload {
  guid?: string;
}
