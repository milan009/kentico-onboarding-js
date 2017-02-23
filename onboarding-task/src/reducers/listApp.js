import { combineReducers } from 'redux';

import { list } from './listReducer.js';
import { areEditable } from './areEditableReducer.js';

const listApp = combineReducers({
  list,
  areEditable,
});

export { listApp };
