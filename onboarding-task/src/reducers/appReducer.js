import { listReducer } from './ListReducers/listReducer';
import { localStateReducer } from './LocalStateReducers/localStateReducer';

import { combineReducers } from 'redux';

export const appReducer = combineReducers({
  listState: listReducer,
  localState: localStateReducer,
});
