import uuidV4 from 'uuid';

import * as actionTypes from './actionTypes';

const createItem = (idGenerator, text) => ({
  type: actionTypes.ITEM_CREATED,
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
  type: actionTypes.ITEM_DELETED,
  payload: { id },
});

export const cancelChange = (id) => ({
  type: actionTypes.ITEM_CHANGE_CANCELLED,
  payload: { id },
});

export const saveChange = (id, text) => ({
  type: actionTypes.ITEM_CHANGE_SAVED,
  payload: {
    id,
    text,
  },
});

export const makeEditable = (id) => ({
  type: actionTypes.ITEM_MAKE_EDITABLE,
  payload: { id },
});
