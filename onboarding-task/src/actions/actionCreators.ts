import { TOGGLE_ITEM_VIEW_MODE, EDIT_ITEM, DELETE_ITEM } from './actionTypes';
import { generateGuid } from '../utils/generateGuid';
import { createItemFactory } from './createItemFactory';
import { IAction } from './IAction';

const deleteItem = (id: string): IAction => ({
  type: DELETE_ITEM,
  payload: { id },
});

const editItem = (id: string, value: string): IAction => ({
  type: EDIT_ITEM,
  payload: { id, value },
});

const toggleItemViewMode = (id: string): IAction => ({
  type: TOGGLE_ITEM_VIEW_MODE,
  payload: { id },
});

const createItemWithDependencies = createItemFactory(generateGuid);

export { createItemWithDependencies as createItem, deleteItem, editItem, toggleItemViewMode };
