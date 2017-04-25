import { Map, List, OrderedSet } from 'immutable';
import { ItemRecord } from './ItemRecord';
import { IItemFlags } from '../reducers/itemsFlags';

export interface IAppState {
  itemsById: Map<string, ItemRecord>;
  itemsFlags: Map<string, IItemFlags>;
  itemsOrder: OrderedSet<string>;
  loaded: boolean;
  errors: List<string>;
}
