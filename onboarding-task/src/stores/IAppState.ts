import { OrderedMap, Set, OrderedSet } from 'immutable';
import { IItem } from '../models/Item';

interface IAppState {
  items: OrderedMap<string, IItem>;
  editedItems: Set<string>;
  itemOrder: OrderedSet<string>;
}

export {IAppState}
