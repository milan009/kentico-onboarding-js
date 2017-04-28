import {
  ITEM_ADDED,
  ITEM_DELETED,
} from '../actions/actionTypes';

export function getOrderedIds(orderedIds, action) {
  switch (action.type) {
    case ITEM_DELETED:
      return orderedIds.filter(x => x !== action.payload.id);
    case ITEM_ADDED:
      return orderedIds.push(action.payload.id);
    default:
      return orderedIds;
  }
}
