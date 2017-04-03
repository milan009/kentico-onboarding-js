import { combineReducers } from 'redux';
import { itemsReducer } from './itemsReducers/itemsReducer';
import { IAction } from '../actions/IAction';
import { IAppState } from './IAppState';

type IRootReducer = (state: IAppState, action: IAction) => IAppState;

const rootReducer: IRootReducer = combineReducers({
  items: itemsReducer,
}) as IRootReducer;

export { rootReducer };
