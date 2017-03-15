import * as memoize from 'memoizee';
import { ViewItem, IViewItem } from '../viewModels/ViewItem';
import { IAppState } from '../stores/IAppState';

const selectViewItem = memoize((state: IAppState, id: string, zeroBasedIndex: number): IViewItem => {
  const item = state.items.get(id);

  return new ViewItem({
    text: item.text,
    isEdited: state.editedItems.has(id),
    index: zeroBasedIndex + 1,
  });
});

export { selectViewItem };
