import { Record } from 'immutable';
const memoize = require('memoizee');

const indexedItem = (item, index) => ({ ...item, index });

const memoizedIndexedItem = Record(memoize(indexedItem));

export { memoizedIndexedItem as IndexedItem };

