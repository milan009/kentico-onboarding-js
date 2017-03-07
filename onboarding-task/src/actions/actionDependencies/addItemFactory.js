import { ADD_ITEM } from '../actionTypes.js';

const addItem = (text, generateGuid) => ({
  type: ADD_ITEM,
  payload: {
    guid: generateGuid(),
    text,
  },
});

export function addItemFactory(generateGuid) {
  return (text) => addItem(text, generateGuid);
}
