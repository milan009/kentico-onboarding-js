import { ADD_ITEM } from './actionTypes.js';

function addItem(text, generateNewId) {
  return {
    type: ADD_ITEM,
    payload: {
      id: generateNewId(),
      text,
    },
  };
}

function addItemFactory(idGenerator) {
  return (text) => addItem(text, idGenerator);
}

export { addItemFactory };
