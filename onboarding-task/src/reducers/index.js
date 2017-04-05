import { combineReducers } from 'redux';
import { manageItems } from './manageItems.js';

const rootReducer = combineReducers({ lines: manageItems });

export { rootReducer };
