import {IAction} from '../interfaces/IAction';
import {
  SEND_ITEM_FAILURE,
  SEND_ITEM_SUCCESS,
} from '../constants/actionTypes';
import { IFetchedItem } from '../interfaces/IFetchedItem';

const sendItemSuccess = (response: IFetchedItem): IAction => {
  return {
    type: SEND_ITEM_SUCCESS,
    payload: {
      response: `Item ${response.Value} was successfully uploaded.`,
    },
  };
};

const sendItemFailure = (response: string): IAction => {
  return {
    type: SEND_ITEM_FAILURE,
    payload: {
      response: response,
    },
  };
};

export { sendItemFailure, sendItemSuccess };
