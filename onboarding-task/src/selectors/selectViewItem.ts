import * as memoize from 'memoizee';
import { ViewItem, IViewItem } from '../viewModels/ViewItem';
import { IItem } from '../models/Item';

const selectViewItem = memoize((item: IItem, isEdited: boolean, zeroBasedIndex: number): IViewItem => {
  return new ViewItem({
    text: item.text,
    isEdited,
    index: zeroBasedIndex + 1,
  });
});

export { selectViewItem };
