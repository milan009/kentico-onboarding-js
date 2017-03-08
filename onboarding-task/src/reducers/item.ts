import { ADD_ITEM, UPDATE_ITEM_TEXT } from '../actions/actionTypes';
import { ItemRecord } from '../utils/itemRecord';
import { IItemAction } from '../actions/actionCreators';

const item: Function = (state = new ItemRecord({}), action: IItemAction) => {
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
};

export { item };
