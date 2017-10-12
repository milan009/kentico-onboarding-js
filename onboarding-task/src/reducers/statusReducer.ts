import { IStatus } from '../interfaces/IStatus';
import { fetchingReducer } from './status/fetchingReducer';
import { combineReducers } from 'redux';
import { errorReducer } from './status/errorReducer';

export const statusReducer = combineReducers<IStatus>({
  isFetching: fetchingReducer,
  requestError: errorReducer,
});


