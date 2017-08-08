import uuidV4 from 'uuid';

import {
  ITEM_CHANGE_CANCELLED,
  ITEM_CHANGE_SAVED,
  ITEM_CREATED,
  ITEM_DELETED,
  ITEM_MAKE_EDITABLE,
} from './actionTypes';

const createItem = (idGenerator, text) => ({
  type: ITEM_CREATED,
  payload: {
    text,
    newId: idGenerator(),
  },
});

export const createItemFactory = (idGenerator) => (
  (itemText) => createItem(idGenerator, itemText)
);
const createItemWithUuidV4 = createItemFactory(uuidV4);

export { createItemWithUuidV4 as createItem };

export const deleteItem = (id) => ({
  type: ITEM_DELETED,
  payload: { id },
});

export const cancelChange = (id) => ({
  type: ITEM_CHANGE_CANCELLED,
  payload: { id },
});

export const saveChange = (id, text) => ({
  type: ITEM_CHANGE_SAVED,
  payload: {
    id,
    text,
  },
});

export const makeEditable = (id) => ({
  type: ITEM_MAKE_EDITABLE,
  payload: { id },
});
