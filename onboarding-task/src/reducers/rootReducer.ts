import { listReducer } from './list/listReducer';
import { IAction } from '../actions/actionInterface';
import { OrderedMap } from 'immutable';
import { ItemData } from '../models/ItemData';
import { ItemFlags } from '../models/ItemFlags';

interface IStore {
  list: {
    itemsById: OrderedMap<string, ItemData>;
    itemFlagsMap: OrderedMap<string, ItemFlags>;
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
