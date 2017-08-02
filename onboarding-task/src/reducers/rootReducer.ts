import { listReducer } from './list/listReducer';
import { IAction } from '../actions/actionInterface';
import { OrderedMap } from 'immutable';
import { IItemDataRecord } from '../models/ItemData';
import { IItemFlagsRecord } from '../models/ItemFlags';

interface IStore {
  list: {
    itemsById: OrderedMap<string, IItemDataRecord>;
    itemFlagsMap: OrderedMap<string, IItemFlagsRecord>;
  };
}

const defaultStore = {
  list: {
    itemsById: OrderedMap<string, IItemDataRecord>(),
    itemFlagsMap: OrderedMap<string, IItemFlagsRecord>(),
  },
};

export const rootReducer = (state: IStore = defaultStore, action: IAction): IStore => ({
  list: listReducer(state.list, action),
});
