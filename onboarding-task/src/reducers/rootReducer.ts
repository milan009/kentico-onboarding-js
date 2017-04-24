import { combineReducers } from 'redux';
import { itemsReducer } from './itemsReducers/itemsReducer';
import { IAction } from '../actions/IAction';
import { IAppState } from './IAppState';
import { errorsReducer } from './errorsReducer';

type rootReducer = (state: IAppState, action: IAction) => IAppState;

const rootReducer: rootReducer = combineReducers({
  items: itemsReducer,
  errors: errorsReducer,
}) as rootReducer;

export { rootReducer };
