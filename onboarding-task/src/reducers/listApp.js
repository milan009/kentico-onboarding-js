import { combineReducers } from 'redux';

import { list } from './listReducer.js';
import { editedItems } from './editedItemsReducer.js';

const listApp = combineReducers({
  list,
  editedItems,
});

export { listApp };
