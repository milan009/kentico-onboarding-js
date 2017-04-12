import { combineReducers } from 'redux';

import { itemsReducer } from './itemsReducers/itemsReducer';
import { IItems } from '../interfaces/IItems';
import { IAction } from '../interfaces/IAction';

interface IState {
  readonly items: IItems;
}

type IRootReducer = (state: IState, action: IAction) => IState;

const rootReducer: IRootReducer = combineReducers({
  items: itemsReducer,
}) as IRootReducer;

export { rootReducer };
