import { combineReducers } from 'redux';
import { itemsReducer } from './itemsReducer.js';
import { itemIDsReducer } from './itemIDsReducer.js';

const rootReducer = combineReducers({
  items: itemsReducer,
  itemIDs: itemIDsReducer,
});

export { rootReducer };
