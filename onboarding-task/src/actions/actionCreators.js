import * as ActionTypes from './actionTypes';
import uuidV4 from 'uuid';

export const createItem = (text) => ({
  type: ActionTypes.ITEM_CREATED,
  payload: {
    text,
    newId: uuidV4(),
  },
});

export const deleteItem = (id) => ({
  type: ActionTypes.ITEM_DELETED,
  payload: { id },
});

export const cancelChange = (id) => ({
  type: ActionTypes.ITEM_CHANGE_CANCELLED,
  payload: { id },
});

export const saveChange = (id, text) => ({
  type: ActionTypes.ITEM_CHANGE_SAVED,
  payload: {
    id,
    text,
  },
});

export const makeEditable = (id) => ({
  type: ActionTypes.ITEM_MAKE_EDITABLE,
  payload: { id },
});
