import { List } from 'immutable';

import {
  CREATE_ITEM_IN_LIST,
  DELETE_ITEM_FROM_LIST,
  FETCH_ITEMS_SUCCESS,
  SEND_ITEM_FAILURE,
  SEND_ITEM_SUCCESS,
} from '../../constants/actionTypes';
import { IAction } from '../../interfaces/IAction';
import { IFetchedItem } from '../../interfaces/IFetchedItem';

const itemsOrderReducer = (prevState = List<string>(), action: IAction): List<string> => {
  switch (action.type) {
    case CREATE_ITEM_IN_LIST:
      return prevState.push(action.payload.id);

    case DELETE_ITEM_FROM_LIST:
      const index = prevState.indexOf(action.payload.id);
      return prevState.splice(index, 1) as List<string>;

    case FETCH_ITEMS_SUCCESS:
      let newState = List<string>();
      action.payload.response.forEach((item: IFetchedItem) => {
        newState = newState.push(item.id);
      });
      return newState;

    case SEND_ITEM_SUCCESS:
      return prevState.set(prevState.indexOf(action.payload.item.ueid), action.payload.item.id)

    case SEND_ITEM_FAILURE:
      return prevState.delete(prevState.indexOf(action.payload.itemId));

    default:
      return prevState;
  }
};

export { itemsOrderReducer };
