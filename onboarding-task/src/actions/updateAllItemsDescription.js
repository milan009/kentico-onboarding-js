import { ALL_ITEMS_DESCRIPTION_UPDATE } from './actionTypes';
import action from './action';
import { getStorableEditedItems } from '../utils/item';

const updateItemDescription = editedItems => action(
  ALL_ITEMS_DESCRIPTION_UPDATE,
  {
    storableItems: getStorableEditedItems(editedItems),
  });

export default updateItemDescription;
