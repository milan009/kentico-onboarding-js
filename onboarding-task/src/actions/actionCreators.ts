import * as uuidV4 from 'uuid';

import { IAction } from './actionInterface';
import * as actionTypes from './actionTypes';

export const createItemWithGenerator = ({ idGenerator }: { idGenerator: () => string}, text: string): IAction => ({
  type: actionTypes.ITEM_CREATED,
  payload: {
    text,
    newId: idGenerator(),
  },
});

export const createItemFactory = (deps) => (createItem.bind(null, deps));
const createItemWithUuidV4 = createItemFactory({ idGenerator: uuidV4 });

export { createItemWithUuidV4 as createItem };

export const deleteItem = (id: string): IAction => ({
  type: actionTypes.ITEM_DELETED,
  payload: {id},
});

export const cancelChange = (id: string): IAction => ({
  type: actionTypes.ITEM_CHANGE_CANCELLED,
  payload: {id},
});

export const saveChange = (id: string, text: string): IAction => ({
  type: actionTypes.ITEM_CHANGE_SAVED,
  payload: {
    id,
    text,
  },
});

export const makeEditable = (id: string): IAction => ({
  type: actionTypes.ITEM_MAKE_EDITABLE,
  payload: {id},
});
