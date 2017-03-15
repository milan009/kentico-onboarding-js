import { START_EDIT_ITEM, STOP_EDIT_ITEM } from './actionTypes';
import { IAction } from './IAction';

function startEditItem(id: string): IAction {
  return {
    type: START_EDIT_ITEM,
    payload: {
      id,
    },
  };
}

function stopEditItem(id: string): IAction {
  return {
    type: STOP_EDIT_ITEM,
    payload: {
      id,
    },
  };
}

export { startEditItem, stopEditItem };
