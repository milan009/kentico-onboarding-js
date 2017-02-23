import { ADD_ITEM_TO_LIST, DELETE_ITEM_FROM_LIST, UPDATE_ITEM, SWITCH_FORM_VISIBILITY_FOR_ITEM } from '../constants/actionTypes';

const createListItemFactory = (createGuid) => {
  return createListItem.bind(null, createGuid);
};

const createListItem = (createGuid, text) => {
  return {
    type: ADD_ITEM_TO_LIST,
    text,
    id: createGuid(),
  };
};

const switchFormVisibilityForListItem = (id) => {
  return {
    type: SWITCH_FORM_VISIBILITY_FOR_ITEM,
    id,
  };
};

const updateListItem = (id, text) => {
  return {
    type: UPDATE_ITEM,
    id,
    text,
  };
};

const deleteListItem = (id) => {
  return {
    type: DELETE_ITEM_FROM_LIST,
    id,
  };
};

export { createListItemFactory, switchFormVisibilityForListItem, updateListItem, deleteListItem };
