import { combineReducers } from 'redux';

import { ItemsDataMap, itemsReducer } from './itemsReducer';
import { ItemsFlagsMap, itemFlagsMapReducer } from './itemFlagsMapReducer';

interface IState {
  itemsById: ItemsDataMap;
  itemFlagsMap: ItemsFlagsMap;
}

export const listReducer = combineReducers<IState>({
  itemsById: itemsReducer,
  itemFlagsMap: itemFlagsMapReducer,
});


