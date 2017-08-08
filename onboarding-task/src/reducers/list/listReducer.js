import { combineReducers } from 'redux';

import { itemsReducer } from './itemsReducer';
import { itemFlagsMapReducer } from './itemFlagsMapReducer';

export const listReducer = combineReducers({
  itemsById: itemsReducer,
  itemFlagsMap: itemFlagsMapReducer,
});

