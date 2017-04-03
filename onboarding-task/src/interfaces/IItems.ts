import { Item } from '../types/Item';
import { Map, OrderedMap } from 'immutable';
import { ItemUi } from '../types/ItemUi';

export interface IItems {
  byId: OrderedMap<string, Item>;
  uiProperties: Map<string, ItemUi>;
}
