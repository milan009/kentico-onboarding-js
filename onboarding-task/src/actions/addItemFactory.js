import { ADD_ITEM } from './actionTypes.js';
import { Item } from '../models/ItemModel.js';

function addItem(text, generateNewId) {
  return {
    type: ADD_ITEM,
    payload: {
      item: Item({ id: generateNewId(), text }),
    },
  };
}

function addItemFactory(idGenerator) {
  return text => addItem(text, idGenerator);
}

export { addItemFactory };
