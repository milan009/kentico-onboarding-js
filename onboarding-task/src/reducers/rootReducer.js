import { combineReducers } from 'redux';
import { itemsReducer } from './itemsReducer.js';

const rootReducer = combineReducers({ lines: itemsReducer });

export { rootReducer };
