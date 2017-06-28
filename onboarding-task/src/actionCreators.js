/**
 * Created by MilanJ on 28.6.2017.
 */

import * as ActionTypes from './actionTypes';

export const createItem = (text) => ({
  type: ActionTypes.ITEM_CREATED,
  text,
});

export const deleteItem = (id) => ({
  type: ActionTypes.ITEM_DELETED,
  id,
});

export const cancelChange = (id, text) => ({
  type: ActionTypes.CHANGE_CANCELLED,
  id,
  text,
});

export const saveChange = (id, text) => ({
  type: ActionTypes.CHANGE_SAVED,
  id,
  text,
});

export const makeEditable = (id, text) => ({
  type: ActionTypes.MAKE_EDITABLE,
  id,
  text,
});
