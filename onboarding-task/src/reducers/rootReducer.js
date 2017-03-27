import { combineReducers } from 'redux';
import { itemsReducer } from './itemsReducers/itemsReducer.js';

const rootReducer = combineReducers({
  items: itemsReducer,
});

export { rootReducer };
