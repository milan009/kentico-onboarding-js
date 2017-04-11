import { ITEM_VIEW_MODE_TOGGLED, ITEM_EDITED, ITEM_DELETED } from './actionTypes';
import { generateGuid } from '../utils/generateGuid';
import { createItemFactory } from './createItemFactory';
import { IAction } from './IAction';

const deleteItem = (id: string): IAction => ({
  type: ITEM_DELETED,
  payload: { id },
});

const editItem = (id: string, value: string): IAction => ({
  type: ITEM_EDITED,
  payload: { id, value },
});

const toggleItemViewMode = (id: string): IAction => ({
  type: ITEM_VIEW_MODE_TOGGLED,
  payload: { id },
});

const createItemWithDependencies = createItemFactory(generateGuid);

export { createItemWithDependencies as createItem, deleteItem, editItem, toggleItemViewMode };
