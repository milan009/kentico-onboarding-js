import { Item } from '../../models/Item';
import { Map, OrderedMap } from 'immutable';
import { ItemUi } from '../../models/ItemUi';

export interface IItems {
  byId: OrderedMap<string, Item>;
  uiProperties: Map<string, ItemUi>;
}
