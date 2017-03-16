import {IAction} from '../interfaces/IAction';
import {
  SEND_ITEM_FAILURE,
  SEND_ITEM_SUCCESS,
} from '../constants/actionTypes';

const sendItemSuccess = (response: string): IAction => {
  return {
    type: SEND_ITEM_SUCCESS,
    payload: {
      response: response,
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
