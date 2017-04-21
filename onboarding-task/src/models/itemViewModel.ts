import { IItemViewModel } from './IItemViewModel';
const memoize = require('memoizee');
import { IItem } from './IItem';

const itemViewModel = (item: IItem, index: number): IItemViewModel => ({
  ...item.toObject(),
  index,
});

const memoizedItem = memoize(itemViewModel);

export { memoizedItem as itemViewModel };
