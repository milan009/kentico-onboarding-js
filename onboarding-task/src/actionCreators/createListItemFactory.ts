import TsPromise from 'ts-promise';

import { CREATE_ITEM_IN_LIST } from '../constants/actionTypes';
import { IAction } from '../interfaces/IAction';
import { dispatchType } from '../utils/dispatchType';
import { IFetchedItem } from '../interfaces/IFetchedItem';

type ICreateGuid = () => string;
type ISendItem = (item: IFetchedItem) => (dispatch: dispatchType) => Promise<IAction>;

const createListItemAction = (id: string, text: string): IAction => {
  return {
    type: CREATE_ITEM_IN_LIST,
    payload: {
      text,
      id,
    },
  };
};

const createListItem = (createGuid: ICreateGuid, text: string, sendItemParam: ISendItem) => {
  const id = createGuid();
  return (dispatch: dispatchType) => {
    dispatch(createListItemAction(id, text));
    return TsPromise.resolve(dispatch(sendItemParam({ id: 'null', value: text, ueid: id })));
  };
};

const createListItemFactory = (createGuid: ICreateGuid, sendItemParam: ISendItem) =>
  (text: string) => createListItem(createGuid, text, sendItemParam);

export { createListItemFactory, createListItemAction };
