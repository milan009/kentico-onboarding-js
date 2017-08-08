import { combineReducers } from 'redux';

import { listReducer } from './list/listReducer';

export const rootReducer = combineReducers({
  list: listReducer,
});
