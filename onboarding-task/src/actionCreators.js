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

export const cancelChange = (id) => ({
  type: ActionTypes.CHANGE_CANCELLED,
  id,
});

export const saveChange = (id) => ({
  type: ActionTypes.CHANGE_SAVED,
  id,
});

export const makeEditable = (id) => ({
  type: ActionTypes.MAKE_EDITABLE,
  id,
});
