import { combineReducers } from 'redux';

import { items } from './items';
import { editedItems } from './editedItems';
import { itemOrder } from './itemOrder';

const listApp = combineReducers({
  items,
  editedItems,
  itemOrder,
});

export { listApp };
