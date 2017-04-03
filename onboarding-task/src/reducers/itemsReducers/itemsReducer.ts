import { combineReducers } from 'redux';
import { itemsByIdReducer } from './itemsByIdReducer';
import { itemsUiPropertiesReducer } from './itemsUiPropertiesReducer';
import { IItems } from '../../interfaces/state/IItems';
import { IAction } from '../../interfaces/state/IAction';

type IItemsReducer = (items: IItems, action: IAction) => IItems;

const itemsReducer: IItemsReducer = combineReducers({
  byId: itemsByIdReducer,
  uiProperties: itemsUiPropertiesReducer,
}) as IItemsReducer;

export { itemsReducer };
