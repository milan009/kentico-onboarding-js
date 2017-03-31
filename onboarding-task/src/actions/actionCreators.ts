import {ITEM_CREATED, ITEM_VIEW_MODE_TOGGLED, ITEM_EDITED, ITEM_DELETED} from './actionTypes';
import {generateGuid} from '../utils/generateGuid';
import {createItemFactory} from './createItemFactory';
import {IAction} from '../stores/IAction';

// TODO: insert types of funs

// TODO: rewrite/delete createItemFlags
const createItemFlags = (id: string): IAction => ({
  type: ITEM_CREATED,
  payload: { id },
});

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

export { createItemWithDependencies as createItem, deleteItem, editItem, toggleItemViewMode, createItemFlags };
