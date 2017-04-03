import {IAction} from '../interfaces/IAction';
import {
  SEND_ITEM_FAILURE,
  SEND_ITEM_SUCCESS,
} from '../constants/actionTypes';
import { IFetchedItem } from '../interfaces/IFetchedItem';
import { sendItemFactory } from './sendItemFactory';

const sendItemSuccess = (sentItem: IFetchedItem): IAction => {
  return {
    type: SEND_ITEM_SUCCESS,
    payload: {
      successMessage: `Item ${sentItem.value} was successfully uploaded.`,
      item: sentItem,
    },
  };
};

const sendItemFailure = (errorMessage: string, itemId: string): IAction => {
  return {
    type: SEND_ITEM_FAILURE,
    payload: {
      errorMessage,
      itemId
    },
  };
};

const sendItem = sendItemFactory(fetch);

export { sendItemFailure, sendItemSuccess, sendItem };
