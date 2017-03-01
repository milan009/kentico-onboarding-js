import memoize from 'memoizee';
import { Item } from '../viewModels/Item.js';

const getEditedItems = (state) => state.editedItems;
const getItems = (state) => state.items;

const itemSelector = memoize((state) => {
  const editedItems = getEditedItems(state);
  const items = getItems(state);
  return items.map((item, id) => new Item({ id, text: item.text, isEdited: editedItems.has(id) }));
});


export { itemSelector };
