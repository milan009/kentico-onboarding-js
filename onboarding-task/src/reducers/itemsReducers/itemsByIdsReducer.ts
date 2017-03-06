import { Map } from 'immutable';

import {
  UPDATE_TEXT_OF_ITEM,
  CREATE_ITEM_IN_LIST,
  DELETE_ITEM_FROM_LIST,
} from '../../constants/actionTypes';
import { itemReducer } from './itemReducer';
import {ItemRecord} from '../../models/ItemRecord';

interface IAction {
  type: string;
  payload: { id: string; text?: string; };
}

interface IItemRecord extends ItemRecord {
  id: string;
  text: string;
}

const itemsByIdsReducer = (prevState = Map(), action: IAction) => {
  switch (action.type) {
    case CREATE_ITEM_IN_LIST:
      const newItem = itemReducer(undefined, action);
      return prevState.set(action.payload.id, newItem);
    case UPDATE_TEXT_OF_ITEM:
      const item = prevState.get(action.payload.id);
      return prevState.set(action.payload.id, itemReducer(item as IItemRecord, action));
    case DELETE_ITEM_FROM_LIST:
      return prevState.delete(action.payload.id);
    default:
      return prevState;
  }
};

export { itemsByIdsReducer };
