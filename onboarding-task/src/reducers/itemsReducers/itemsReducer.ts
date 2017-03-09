import { combineReducers } from 'redux';

import { itemsByIdsReducer } from './itemsByIdsReducer';
import { itemsOrderReducer } from './itemsOrderReducer';
import { itemsUiPropsReducer } from './itemsUiPropsReducer';
import { IItems } from '../../interfaces/IItems';
import { IAction } from '../../interfaces/IAction';

type IItemsReducer = (itemsState: IItems, action: IAction) => IItems;

const itemsReducer: IItemsReducer = combineReducers({
  byId: itemsByIdsReducer,
  orderedIds: itemsOrderReducer,
  uiPropsById: itemsUiPropsReducer,
}) as IItemsReducer;

export { itemsReducer };
