/**
 * Created by VlastimilM on 4.4.2017.
 */
import { ITEM_ADDED, ITEM_DELETED, ITEM_SAVED, START_EDITING_ITEM, STOP_EDITING_ITEM } from '../actions/actionTypes';
import { Item } from '../models/Item';
function app(state = { items: undefined, orderedIds: undefined }, action) {
  return {
    items: getItems(state.items, action),
    orderedIds: getOrderedIds(state.orderedIds, action),
  };
}

function getItems(items, action) { // TODO decompose
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
      return items.set(action.id, getItem(items.get(action.id), action));

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
      return item.set('isEditing', 'true'); // TODO update record so it doesnt end up as an object, true or 'true' in set?

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

    default:
      return item;
  }
}

