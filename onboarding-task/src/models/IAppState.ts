import { ItemRecord } from './ItemRecord';
import { Map, OrderedSet, Set } from 'immutable';
import { IItemFlags } from '../reducers/itemsFlags';

export interface IAppState {
  itemsById: Map<string, ItemRecord>;
  itemsFlags: Map<string, IItemFlags>;
  itemsOrder: OrderedSet<string>;
  loaded: boolean;
  errors: Set<any>;
}
