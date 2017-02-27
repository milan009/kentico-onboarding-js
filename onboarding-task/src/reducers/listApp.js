import { combineReducers } from 'redux';

import { items } from './items.js';
import { editedItems } from './editedItems.js';

const listApp = combineReducers({
  items,
  editedItems,
});

export { listApp };
