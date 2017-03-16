import { combineReducers } from 'redux';

import { itemsByIdsReducer } from './itemsByIdsReducer';
import { itemsOrderReducer } from './itemsOrderReducer';
import { itemsUiPropsReducer } from './itemsUiPropsReducer';
import { IItems } from '../../interfaces/IItems';
import { IAction } from '../../interfaces/IAction';
import { FETCH_ITEMS_REQUEST, FETCH_ITEMS_FAILURE } from '../../constants/actionTypes';

type IItemsReducer = (itemsState: IItems, action: IAction) => IItems;

const isFetchingReducer = (_: boolean, action: IAction) => action.type === FETCH_ITEMS_REQUEST;

const errorReducer = (_: string, action: IAction) => action.type === FETCH_ITEMS_FAILURE ? action.payload.response : '';

const itemsReducer: IItemsReducer = combineReducers({
  byId: itemsByIdsReducer,
  orderedIds: itemsOrderReducer,
  uiPropsById: itemsUiPropsReducer,
  isFetching: isFetchingReducer,
  error: errorReducer,
}) as IItemsReducer;

export { itemsReducer };
