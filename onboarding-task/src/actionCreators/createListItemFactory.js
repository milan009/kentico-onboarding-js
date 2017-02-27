import { ADD_ITEM_TO_LIST } from '../constants/actionTypes';

const createListItemFactory = (createGuid) => {
  return createListItem.bind(null, createGuid);
};

const createListItem = (createGuid, text) => {
  return {
    type: ADD_ITEM_TO_LIST,
    payload: {
      text,
      id: createGuid(),
    },
  };
};

export { createListItemFactory };
