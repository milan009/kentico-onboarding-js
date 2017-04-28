import { getItem } from './itemReducer';
import {
  ITEM_ADDED,
  ITEM_DELETED,
  ITEM_SAVED,
  START_EDITING_ITEM,
  STOP_EDITING_ITEM,
  UPDATE_ITEM_TEXT,
} from '../actions/actionTypes';
import { Item } from '../models/Item';

export function getItemsById(items, action) {
  switch (action.type) {

    case ITEM_ADDED:
      return items.set(
        action.payload.id,
        new Item({
          id: action.payload.id,
          textSaved: action.payload.text,
          textShown: action.payload.text,
          isEditing: false,
        })
      );

    case ITEM_DELETED:
      return items.delete(action.payload.id);

    case ITEM_SAVED:
    case START_EDITING_ITEM:
    case STOP_EDITING_ITEM:
    case UPDATE_ITEM_TEXT: {
      const originalItem = items.get(action.payload.id);
      const updatedItem = getItem(originalItem, action);
      return items.set(action.payload.id, updatedItem);
    }

    default:
      return items;
  }
}
