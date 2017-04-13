import { combineReducers } from 'redux';
import { itemsByIdReducer } from './itemsByIdReducer';
import { itemsUiPropertiesReducer } from './itemsUiPropertiesReducer';
import { IItems } from './IItems';
import { IAction } from '../../actions/IAction';
import { fetchingReducer } from './fetchingReducer';

type IItemsReducer = (items: IItems, action: IAction) => IItems;

const itemsReducer: IItemsReducer = combineReducers({
  byId: itemsByIdReducer,
  uiProperties: itemsUiPropertiesReducer,
  isFetching: fetchingReducer,
}) as IItemsReducer;

export { itemsReducer };
