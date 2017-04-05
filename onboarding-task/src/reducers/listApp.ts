import { combineReducers } from 'redux';

import { items } from './items';
import { editedItems } from './editedItems';
import { itemsOrder } from './itemsOrder';
import {isFetching} from './isFetching';
import { errorMessage } from './errorMessage';

const listApp = combineReducers({
  items,
  editedItems,
  itemsOrder,
  isFetching,
  errorMessage
});

export { listApp };
