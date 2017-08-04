import { combineReducers } from 'redux';

import { ItemsDataMap } from './list/itemsReducer';
import { ItemsFlagsMap } from './list/itemFlagsMapReducer';
import { listReducer } from './list/listReducer';

interface IStore {
  list: {
    itemsById: ItemsDataMap;
    itemFlagsMap: ItemsFlagsMap;
  };
}

export const rootReducer = combineReducers<IStore>({
  list: listReducer,
});
