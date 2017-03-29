import { combineReducers } from 'redux';
import { itemsReducer } from './itemsReducers/itemsReducer';
import { IAction } from '../interfaces/IAction';
import { IAppState } from '../interfaces/IAppState';

type IRootReducer = (state: IAppState, action: IAction) => IAppState;

const rootReducer: IRootReducer = combineReducers({
  items: itemsReducer,
}) as IRootReducer;

export { rootReducer };
