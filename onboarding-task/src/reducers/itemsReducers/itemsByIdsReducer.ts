import { Map } from 'immutable';

import {
  UPDATE_TEXT_OF_ITEM,
  CREATE_ITEM_IN_LIST,
  DELETE_ITEM_FROM_LIST,
  FETCH_ITEMS_SUCCESS,
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
      let result = Map<string, ItemRecord>();
      action.payload.response.forEach((fetchedItem: IFetchedItem) => {
        result = result.set(fetchedItem.id, new ItemRecord({ id: fetchedItem.id, text: fetchedItem.text }));
      });
      return result;

    default:
      return prevState;
  }
};

export { itemsByIdsReducer };
