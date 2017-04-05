import {ADD_ITEM, UPDATE_ITEM_TEXT} from '../actions/actionTypes';
import { ItemRecord } from '../models/ItemRecord';
import {IAction} from '../actions/IAction';

function item (state = new ItemRecord({}), action: IAction): ItemRecord {
  switch (action.type) {
    case ADD_ITEM:
      return new ItemRecord({
        guid: action.payload.guid,
        text: action.payload.text,
      });

    case UPDATE_ITEM_TEXT:
      return state.set('text', action.payload.text) as ItemRecord;

    default:
      return state;
  }
}

export { item };
