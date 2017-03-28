import {
  ITEM_CREATE,
} from './actionTypes';
import { IAction } from '../interfaces/IAction';

type IGenerateId = () => string;
type IItemFactory = (text: string) => IAction;

const createItem = (idGenerator: IGenerateId, text: string): IAction => {
  return {
    type: ITEM_CREATE,
    payload: {
      id: idGenerator(),
      text,
    },
  };
};

export const createItemFactory = (idGenerator: IGenerateId): IItemFactory => (text: string) => {
  return createItem(idGenerator, text);
};
