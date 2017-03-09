import { CREATE_ITEM_IN_LIST } from '../constants/actionTypes';
import { IAction } from '../interfaces/IAction';

type ICreateGuid = () => string;

const createListItem = (createGuid: ICreateGuid, text: string): IAction => {
  return {
    type: CREATE_ITEM_IN_LIST,
    payload: {
      text,
      id: createGuid(),
    },
  };
};

const createListItemFactory = (createGuid: ICreateGuid) => (text: string) => createListItem(createGuid, text);

export { createListItemFactory };
