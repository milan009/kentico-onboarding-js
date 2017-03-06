import { combineReducers } from 'redux';
import { Map, List} from 'immutable';

import { itemsByIdsReducer } from './itemsByIdsReducer';
import { itemsOrderReducer } from './itemsOrderReducer';
import { itemsUiPropsReducer } from './itemsUiPropsReducer';
import {} from '../../interfaces/IAction';
import { ItemUiPropsRecord } from '../../models/ItemUiPropsRecord';
import { ItemRecord } from '../../models/ItemRecord';
import {IAction} from '../../interfaces/IAction';

interface IItems {
  byId: Map<string, ItemRecord>;
  orderedIds: List<string>;
  uiPropsById: Map<string, ItemUiPropsRecord>;
}

interface IItemsReducer {
  (itemsState: IItems, action: IAction): IItems;
}

const itemsReducer: IItemsReducer = combineReducers({
  byId: itemsByIdsReducer,
  orderedIds: itemsOrderReducer,
  uiPropsById: itemsUiPropsReducer,
}) as IItemsReducer;

export { itemsReducer };
