import { Map as ImmutableMap, List as ImmutableList } from 'immutable';

import { getOrderedIds } from './orderedIdsReducer';
import { getItemsById } from './itemsByIdReducer';

export function getItems(state = { itemsByIds: ImmutableMap(), orderedIds: ImmutableList() }, action) {
  return {
    itemsByIds: getItemsById(state.itemsByIds, action),
    orderedIds: getOrderedIds(state.orderedIds, action),
  };
}
