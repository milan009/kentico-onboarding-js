import { listReducer } from './listReducer';
import { localStateReducer } from './localStateReducer';
import { combineReducers } from 'redux';

export const appReducer = combineReducers({
  listState: listReducer,
  localState: localStateReducer,
});
