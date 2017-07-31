import { combineReducers } from 'redux';

import { itemsReducer } from './itemsReducer';
import { itemFlagsMapReducer } from './itemFlagsMapReducer';

export const listReducer = combineReducers({
  items: itemsReducer,
  itemFlagsMap: itemFlagsMapReducer,
});

