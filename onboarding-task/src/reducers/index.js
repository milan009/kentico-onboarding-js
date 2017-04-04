import { combineReducers } from 'redux';
import { manageItems } from './manageItems.js';

const rootReducer = combineReducers({ manageItems });

export { rootReducer };
