import { CREATE_ITEM_IN_LIST } from '../constants/actionTypes';

interface ICreateListItemAction {
  type: string;
  payload: { text: string; id: string };
}

interface ICreateGuid {
  (): string;
}

const createListItem = (createGuid: ICreateGuid, text: string): ICreateListItemAction => {
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
