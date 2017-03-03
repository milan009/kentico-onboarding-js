import { ADD_ITEM } from './actionTypes';
import { Item } from '../models/Item';
import { IAction } from './IAction';

function addItem(text: string, generateNewId: Function): IAction {
  return {
    type: ADD_ITEM,
    payload: {
      item: new Item({ id: generateNewId(), text }),
    },
  };
}

function addItemFactory(idGenerator: Function) {
  return (text: string) => addItem(text, idGenerator);
}

export { addItemFactory };
