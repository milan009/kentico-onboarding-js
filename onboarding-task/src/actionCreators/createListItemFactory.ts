import { CREATE_ITEM_IN_LIST } from '../constants/actionTypes';
import { IAction } from '../interfaces/IAction';
import { dispatchType } from '../utils/dispatchType';
import { sendItem } from './sendItemActionCreators';
import { IFetchedItem } from '../interfaces/IFetchedItem';
import { createGuid as generateGuid } from '../utils/guidHelper';

type ICreateGuid = () => string;
type ISendItem = (item: IFetchedItem) => (dispatch: dispatchType) => Promise<IAction>;

const createListItem = (createGuid: ICreateGuid, text: string, dispatch?: dispatchType, sendItemParam?: ISendItem): IAction => {
  const id = createGuid();
  if (dispatch && sendItemParam) dispatch(sendItemParam({ Id: id, Value: text }));
  return {
    type: CREATE_ITEM_IN_LIST,
    payload: {
      text,
      id,
    },
  };
};

const createListItemFactory = (createGuid: ICreateGuid) => (text: string) => createListItem(createGuid, text);

const createListItemWithDispatchFactory = (dispatch: dispatchType, createGuid: ICreateGuid, sendItemParam: ISendItem) =>
  (text: string) => createListItem(createGuid, text, dispatch, sendItemParam);

const createListItemWithDispatch = (dispatch: dispatchType) => createListItemWithDispatchFactory(dispatch, generateGuid, sendItem);

export { createListItemFactory, createListItemWithDispatchFactory, createListItemWithDispatch };
