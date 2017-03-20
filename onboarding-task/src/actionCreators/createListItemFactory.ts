import { CREATE_ITEM_IN_LIST } from '../constants/actionTypes';
import { IAction } from '../interfaces/IAction';
import { dispatchType } from '../utils/dispatchType';
import { sendItem } from './sendItemActionCreators';

type ICreateGuid = () => string;

const createListItem = (createGuid: ICreateGuid, text: string, dispatch?: dispatchType): IAction => {
  const id = createGuid();
  if (dispatch) dispatch(sendItem({ Id: id, Value: text }));
  return {
    type: CREATE_ITEM_IN_LIST,
    payload: {
      text,
      id,
    },
  };
};

const createListItemFactory = (createGuid: ICreateGuid) => (text: string) => createListItem(createGuid, text);

const createListItemWithDispatchFactory = (dispatch: dispatchType, createGuid: ICreateGuid) => (text: string) => createListItem(createGuid, text, dispatch);

export { createListItemFactory, createListItemWithDispatchFactory };
