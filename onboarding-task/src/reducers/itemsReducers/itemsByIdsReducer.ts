import { Map } from 'immutable';

import {
  UPDATE_TEXT_OF_ITEM,
  CREATE_ITEM_IN_LIST,
  DELETE_ITEM_FROM_LIST,
  FETCH_ITEMS_SUCCESS,
  SEND_ITEM_FAILURE,
  SEND_ITEM_SUCCESS,
} from '../../constants/actionTypes';
import { itemReducer } from './itemReducer';
import {ItemRecord} from '../../models/ItemRecord';
import { IAction } from '../../interfaces/IAction';
import { IFetchedItem } from '../../interfaces/IFetchedItem';

const itemsByIdsReducer = (prevState = Map<string, ItemRecord>(), action: IAction): Map<string, ItemRecord> => {
  switch (action.type) {
    case CREATE_ITEM_IN_LIST:
      const newItem = itemReducer(undefined, action);
      return prevState.set(action.payload.id, newItem);

    case UPDATE_TEXT_OF_ITEM:
      const item = prevState.get(action.payload.id);
      return prevState.set(action.payload.id, itemReducer(item, action));

    case DELETE_ITEM_FROM_LIST:
      return prevState.delete(action.payload.id);

    case FETCH_ITEMS_SUCCESS:
      const tmpResult: { [key: string]: ItemRecord } = {};
      action.payload.response.forEach((fetchedItem: IFetchedItem) => {
        tmpResult[fetchedItem.id] =  new ItemRecord({ id: fetchedItem.id, text: fetchedItem.value });
      });
      return Map<string, ItemRecord>(tmpResult);

    case SEND_ITEM_SUCCESS:
      const tmpState = prevState.delete(action.payload.item.ueid);
      return tmpState.set(action.payload.item.id, new ItemRecord({ id: action.payload.item.id, text: action.payload.item.value }));

    case SEND_ITEM_FAILURE:
      return prevState.delete(action.payload.itemId);

    default:
      return prevState;
  }
};

export { itemsByIdsReducer };
