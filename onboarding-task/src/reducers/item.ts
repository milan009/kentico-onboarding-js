import { ADD_ITEM, UPDATE_ITEM_TEXT } from '../actions/actionTypes';
import { ItemRecord } from '../utils/itemRecord';

export interface IItemAction {
  type: string;
  payload: any;
}

export interface IItemRecord {
  guid: string;
  text: string;
}

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
