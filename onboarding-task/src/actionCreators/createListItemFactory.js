import { CREATE_ITEM_IN_LIST } from '../constants/actionTypes';

const createListItemFactory = (createGuid) => (text) => createListItem(createGuid, text);

const createListItem = (createGuid, text) => {
  return {
    type: CREATE_ITEM_IN_LIST,
    payload: {
      text,
      id: createGuid(),
    },
  };
};

export { createListItemFactory };
