const memoize = require('memoizee');
import { IItem } from '../interfaces/IItem';

const itemViewModel = (item: IItem, index: number) => ({
  ...item.toObject(),
  index,
});

const memoizedItem = memoize(itemViewModel);

export { memoizedItem as itemViewModel };
