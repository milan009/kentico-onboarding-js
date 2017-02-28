import { createSelector } from 'reselect';
import { OrderedMap } from 'immutable';
import { Item } from '../viewModels/Item.js';

const getEditedItems = (state) => state.editedItems;
const getItems = (state) => state.items;

const itemSelector = createSelector(
  [getEditedItems, getItems],
  (editedItems, items) => {
    return items.map((item, id) => {
      return Item({ id, text: item.text, isEdited: editedItems.has(id) });
    });
  }
);

export { itemSelector };
