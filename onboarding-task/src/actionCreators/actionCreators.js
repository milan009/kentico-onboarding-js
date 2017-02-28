import { DELETE_ITEM_FROM_LIST, UPDATE_TEXT_OF_ITEM, SWITCH_FORM_VISIBILITY_FOR_ITEM } from '../constants/actionTypes';
import { createListItemFactory } from './createListItemFactory';
import { guid } from '../utils/guidHelper';

export const createListItem = createListItemFactory(guid);

export const switchFormVisibilityForListItem = (id) => {
  return {
    type: SWITCH_FORM_VISIBILITY_FOR_ITEM,
    payload: {
      id,
    },
  };
};

export const updateListItem = (id, text) => {
  return {
    type: UPDATE_TEXT_OF_ITEM,
    payload: {
      text,
      id,
    },
  };
};

export const deleteListItem = (id) => {
  return {
    type: DELETE_ITEM_FROM_LIST,
    payload: {
      id,
    },
  };
};
