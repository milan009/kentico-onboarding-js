import { combineReducers } from 'redux';
import { itemsReducer } from './itemsReducer.js';

const rootReducer = combineReducers({
  itemsReducer,
});

export { rootReducer };
