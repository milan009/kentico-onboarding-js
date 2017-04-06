import { combineReducers } from 'redux';

import { items } from './items';
import { editedItems } from './editedItems';
import { itemsOrder } from './itemsOrder';
import {isFetching} from './isFetching';
import { errorMessages } from './errorMessages';

const listApp = combineReducers({
  items,
  editedItems,
  itemsOrder,
  isFetching,
  errorMessages
});

export { listApp };
