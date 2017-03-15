import { OrderedMap, Set, OrderedSet } from 'immutable';
import { IItem } from '../models/Item';

interface IAppState {
  items: OrderedMap<string, IItem>;
  editedItems: Set<string>;
  itemsOrder: OrderedSet<string>;
}

export {IAppState}
