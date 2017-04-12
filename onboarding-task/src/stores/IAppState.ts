import { OrderedSet, Map } from 'immutable';
import { IItemData } from '../interfaces/IItem';

export interface IAppState {
  itemIds: OrderedSet<string>;
  items: Map<string, IItemData>;
}
