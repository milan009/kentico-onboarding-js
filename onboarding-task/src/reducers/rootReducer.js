import { combineReducers } from 'redux';
import { itemsReducer } from './itemsReducer.js';
import { itemIdsReducer } from './itemIdsReducer.ts';

const rootReducer = combineReducers({
  items: itemsReducer,
  itemIds: itemIdsReducer,
});

export { rootReducer };
