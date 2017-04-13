import { DISMISS_ERROR } from './actionTypes';
import { IAction } from './IAction';

export const dismissError = (key: string) : IAction => {
  return {
    type: DISMISS_ERROR,
    payload: {
      key,
    }
  };
};
