import {ITEM_CREATED} from './actionTypes';

const createItem = (value: string, generateId: () => string) => ({
  type: ITEM_CREATED,
  payload: {
      id: generateId(),
      value,
  }
});

const createItemFactory = (generateId: () => string) =>
  (value: string) => createItem(value, generateId);

export { createItemFactory };
