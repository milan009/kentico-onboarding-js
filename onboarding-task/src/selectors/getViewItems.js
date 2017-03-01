import memoize from 'memoizee';
import { ViewItem } from '../viewModels/ViewItem.js';

const getViewItems = memoize((state) => {
  const editedItems = state.editedItems;
  const items = state.items;
  return items.map((item, id) => new ViewItem({ id, text: item.text, isEdited: editedItems.has(id) }));
});


export { getViewItems };
