import { ItemRecord } from './ItemRecord';
import { Map, OrderedSet } from 'immutable';
import { IItemFlags } from '../reducers/itemsFlags';

export interface IAppState {
  itemsById: Map<string, ItemRecord>;
  itemsFlags: Map<string, IItemFlags>;
  itemsOrder: OrderedSet<string>;
  isFetching: string;

}
