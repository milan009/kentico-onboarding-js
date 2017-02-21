import { combineReducers } from 'redux';

import { itemsReducer } from './itemsReducer';
import { itemsOrderReducer } from './itemsOrderReducer';

const listReducer = combineReducers({
  items: itemsReducer,
  itemsOrder: itemsOrderReducer,
});

export { listReducer };
