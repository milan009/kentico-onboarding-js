import { combineReducers } from 'redux';

import { items } from './items';
import { editedItems } from './editedItems';

const listApp = combineReducers({
  items,
  editedItems,
});

export { listApp };
