const memoize = require('memoizee');
import { ViewItem } from '../viewModels/ViewItem';
import {IAppState} from '../stores/IAppState';
import {IItem} from '../models/Item';

const getViewItems = memoize((state: IAppState) => {
  const editedItems = state.editedItems;
  const items = state.items;
  return items.map((item: IItem, id: string) => new ViewItem({ id, text: item.text, isEdited: editedItems.has(id) }));
});


export { getViewItems };
