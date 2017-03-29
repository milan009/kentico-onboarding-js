import { combineReducers } from 'redux';

import { itemsByIdsReducer } from './itemsByIdsReducer';
import { itemsOrderReducer } from './itemsOrderReducer';
import { itemsUiPropsReducer } from './itemsUiPropsReducer';
import { IItems } from '../../interfaces/IItems';
import { IAction } from '../../interfaces/IAction';
import {
  FETCH_ITEMS_REQUEST,
  FETCH_ITEMS_FAILURE,
  SEND_ITEM_FAILURE,
  SEND_ITEM_SUCCESS
} from '../../constants/actionTypes';

type IItemsReducer = (itemsState: IItems, action: IAction) => IItems;

const isFetchingReducer = (_: boolean, action: IAction) => action.type === FETCH_ITEMS_REQUEST;

const errorReducer = (_: string, action: IAction) =>
  action.type === FETCH_ITEMS_FAILURE || action.type === SEND_ITEM_FAILURE ? action.payload.errorMessage : '';

const successMessageReducer = (_: string, action: IAction) =>
  action.type === SEND_ITEM_SUCCESS ? action.payload.successMessage : '';

const itemsReducer: IItemsReducer = combineReducers({
  byId: itemsByIdsReducer,
  orderedIds: itemsOrderReducer,
  uiPropsById: itemsUiPropsReducer,
  isFetching: isFetchingReducer,
  error: errorReducer,
  successMessage: successMessageReducer,
}) as IItemsReducer;

export { itemsReducer };
