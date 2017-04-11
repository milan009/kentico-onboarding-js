import { POST_ITEM_SUCCESS, UPDATE_ITEM_TEXT } from '../actions/actionTypes';
import { ItemRecord } from '../models/ItemRecord';
import { IAction } from '../actions/IAction';

function item (state = new ItemRecord({}), action: IAction): ItemRecord {
  switch (action.type) {
    case UPDATE_ITEM_TEXT:
      return state.set('text', action.payload.text) as ItemRecord;

    case POST_ITEM_SUCCESS:
      return new ItemRecord({
        guid: action.payload.item.id,
        text: action.payload.item.text,
      });

    default:
      return state;
  }
}

export { item };
