import { combineReducers } from 'redux';

import { items } from './items';
import { editedItems } from './editedItems';
import { itemsOrder } from './itemsOrder';

const listApp = combineReducers({
  items,
  editedItems,
  itemsOrder,
});

export { listApp };
