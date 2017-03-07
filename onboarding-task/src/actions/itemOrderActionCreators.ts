import { ITEM_ORDER_PUSH, ITEM_ORDER_DELETE } from './actionTypes';
import { IAction } from './IAction';

function itemOrderPush(id: string): IAction {
  return {
    type: ITEM_ORDER_PUSH,
    payload: {
      id,
    },
  };
}

function itemOrderDelete(id: string): IAction {
  return {
    type: ITEM_ORDER_DELETE,
    payload: {
      id,
    },
  };
}

export { itemOrderPush, itemOrderDelete };
