import { combineReducers } from 'redux';

import { itemsByIdsReducer } from './itemsByIdsReducer';
import { itemsOrderReducer } from './itemsOrderReducer';
import { itemsUiPropsReducer } from './itemsUiPropsReducer';
import { IItems } from '../../interfaces/IItems';
import { IAction } from '../../interfaces/IAction';
import { FETCH_ITEMS_REQUEST } from '../../constants/actionTypes';

type IItemsReducer = (itemsState: IItems, action: IAction) => IItems;

const isFetchingReducer = (_: boolean, action: IAction) => action.type === FETCH_ITEMS_REQUEST;

const itemsReducer: IItemsReducer = combineReducers({
  byId: itemsByIdsReducer,
  orderedIds: itemsOrderReducer,
  uiPropsById: itemsUiPropsReducer,
  isFetching: isFetchingReducer,
}) as IItemsReducer;

export { itemsReducer };
