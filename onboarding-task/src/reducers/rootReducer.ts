import { OrderedMap } from 'immutable';

import { IAction } from '../actions/actionInterface';
import { ItemData } from '../models/ItemData';
import { ItemFlags } from '../models/ItemFlags';
import { ItemsDataMap } from './list/itemsReducer';
import { ItemsFlagsMap } from './list/itemFlagsMapReducer';
import { listReducer } from './list/listReducer';

interface IStore {
  list: {
    itemsById: ItemsDataMap;
    itemFlagsMap: ItemsFlagsMap;
  };
}

const defaultStore = {
  list: {
    itemsById: OrderedMap<string, ItemData>(),
    itemFlagsMap: OrderedMap<string, ItemFlags>(),
  },
};

export const rootReducer = (state: IStore = defaultStore, action: IAction) => ({
  list: listReducer(state.list, action),
});
