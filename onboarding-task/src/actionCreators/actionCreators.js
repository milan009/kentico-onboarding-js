import { DELETE_ITEM_FROM_LIST, UPDATE_TEXT_OF_ITEM, SWITCH_FORM_VISIBILITY_FOR_ITEM } from '../constants/actionTypes';
import { createListItemFactory } from './createListItemFactory';
import { guid } from '../utils/guidHelper';

const createListItem = createListItemFactory(guid);

const switchFormVisibilityForListItem = (id) => {
  return {
    type: SWITCH_FORM_VISIBILITY_FOR_ITEM,
    payload: {
      id,
    },
  };
};

const updateListItem = (id, text) => {
  return {
    type: UPDATE_TEXT_OF_ITEM,
    payload: {
      text,
      id,
    },
  };
};

const deleteListItem = (id) => {
  return {
    type: DELETE_ITEM_FROM_LIST,
    payload: {
      id,
    },
  };
};

export { createListItem, switchFormVisibilityForListItem, updateListItem, deleteListItem };
