import {IAction} from '../interfaces/IAction';
import {
  SEND_ITEM_FAILURE,
  SEND_ITEM_SUCCESS,
} from '../constants/actionTypes';
import { IFetchedItem } from '../interfaces/IFetchedItem';
import { sendItemFactory } from './sendItemFactory';

type successMessageCreatorType = (sentItem: IFetchedItem) => string;

const sendItemSuccessCreator = (sentItem: IFetchedItem, successMessageCreator: successMessageCreatorType): IAction => {
  return {
    type: SEND_ITEM_SUCCESS,
    payload: {
      successMessage: successMessageCreator(sentItem),
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

const sendItemSuccess = (sentItem: IFetchedItem) => sendItemSuccessCreator(sentItem, (item: IFetchedItem) => `Item ${item.value} was successfully uploaded.`);

const sendItem = sendItemFactory(fetch);

export { sendItemFailure, sendItemSuccess, sendItem, sendItemSuccessCreator };
