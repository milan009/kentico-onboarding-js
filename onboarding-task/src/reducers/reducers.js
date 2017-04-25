/**
 * Created by VlastimilM on 4.4.2017.
 */
import { ITEM_ADDED, ITEM_DELETED, ITEM_SAVED, START_EDITING_ITEM, STOP_EDITING_ITEM, UPDATE_ITEM_TEXT } from '../actions/actionTypes';
import { Item } from '../models/Item';
import { Map as ImmutableMap, List as ImmutableList } from 'immutable';

function app(state = { items: ImmutableMap(), orderedIds: ImmutableList() }, action) { // TODO rename
  return {
    items: getItems(state.items, action),
    orderedIds: getOrderedIds(state.orderedIds, action),
  };
}


function getItems(items, action) {
  switch (action.type) {

    case ITEM_ADDED:
      return items.set(
        action.id,
        new Item({
          id: action.id,
          textSaved: action.text,
          textShown: action.text,
          isEditing: false,
        })
      );

    case ITEM_DELETED:
      return items.delete(action.id);

    case ITEM_SAVED:
    case START_EDITING_ITEM:
    case STOP_EDITING_ITEM:
    case UPDATE_ITEM_TEXT: {
      const originalItem = items.get(action.id);
      const updatedItem = getItem(originalItem, action);
      return items.set(action.id, updatedItem);
    }

    default:
      return items;
  }
}


function getOrderedIds(orderedIds, action) {
  switch (action.type) {
    case ITEM_DELETED:
      return orderedIds.filter(x => x !== action.id);
    case ITEM_ADDED:
      return orderedIds.push(action.id);
    default:
      return orderedIds;
  }
}


function getItem(item, action) {
  switch (action.type) {

    case START_EDITING_ITEM:
      return item.set('isEditing', true);

    case STOP_EDITING_ITEM:
      return item.merge({
        textShown: item.textSaved,
        isEditing: false,
      });

    case ITEM_SAVED:
      return item.merge({
        textShown: action.text,
        textSaved: action.text,
        isEditing: false,
      });

    case UPDATE_ITEM_TEXT:
      return item.set('textShown', action.text);

    default:
      return item;
  }
}

export { app };
