import { CREATE_ITEM } from './actionTypes';

const createItem = (value: string, generateId: () => string) => ({
  type: CREATE_ITEM,
  payload: {
    id: generateId(),
    value,
  }
});

const createItemFactory = (generateId: () => string) =>
  (value: string) => createItem(value, generateId);

export { createItemFactory };
