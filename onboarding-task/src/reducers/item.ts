import { ADD_ITEM, UPDATE_ITEM_TEXT } from '../actions/actionTypes';
import { ItemRecord } from '../utils/itemRecord';
import { IItemAction } from '../interfaces/IItemAction';
import { IItemRecord } from '../interfaces/IItem';

function item (state = new ItemRecord({}), action: IItemAction): IItemRecord {
  switch (action.type) {
    case ADD_ITEM:
      return new ItemRecord({
        guid: action.payload.guid,
        text: action.payload.text,
      });
    case UPDATE_ITEM_TEXT:
      return state.set('text', action.payload.text);
    default:
      return state;
  }
}

export { item };
