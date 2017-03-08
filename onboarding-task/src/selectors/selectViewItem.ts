import memoize = require('memoizee');
import { ViewItem } from '../viewModels/ViewItem';
import {IAppState} from '../stores/IAppState';

const selectViewItem = memoize((state: IAppState, id: string) => {
  const item = state.items.get(id);
  return new ViewItem({ id: item.id, text: item.text, isEdited: state.editedItems.has(id) });
});

export { selectViewItem };
