import memoize from 'memoizee';
import { ViewItem } from '../viewModels/ViewItem.js';

const getEditedItems = (state) => state.editedItems;
const getItems = (state) => state.items;

const getViewItems = memoize((state) => {
  const editedItems = getEditedItems(state);
  const items = getItems(state);
  return items.map((item, id) => new ViewItem({ id, text: item.text, isEdited: editedItems.has(id) }));
});


export { getViewItems };
