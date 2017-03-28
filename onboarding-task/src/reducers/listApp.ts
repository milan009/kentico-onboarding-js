import { combineReducers } from 'redux';

import { items } from './items';
import { editedItems } from './editedItems';
import { itemsOrder } from './itemsOrder';
import {isFetching} from './isFetching';

const listApp = combineReducers({
  items,
  editedItems,
  itemsOrder,
  isFetching,
});

export { listApp };
