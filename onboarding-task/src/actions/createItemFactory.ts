import {
  ITEM_CREATE,
} from './actionTypes';
import { IAction } from './IAction';

type IGenerateId = () => string;

const createItem = (idGenerator: IGenerateId, text: string): IAction => {
  return {
    type: ITEM_CREATE,
    payload: {
      id: idGenerator(),
      text,
    },
  };
};

export const createItemFactory = (idGenerator: IGenerateId) => (text: string) => {
  return createItem(idGenerator, text);
};
