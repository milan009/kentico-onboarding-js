import { combineReducers } from 'redux';
import { itemsReducer } from './itemsReducer.js';
import { itemIdsReducer } from './itemIdsReducer.js';

const rootReducer = combineReducers({
  items: itemsReducer,
  itemIds: itemIdsReducer,
});

export { rootReducer };
