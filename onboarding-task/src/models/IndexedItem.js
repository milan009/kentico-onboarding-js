// import { Record } from 'immutable';
import memoize from 'memoizee';

const indexedItem = (item, index) => ({
  ...item.toObject(),
  index,
});

const memoizedItem = memoize(indexedItem);

export { memoizedItem as IndexedItem };
