import { OrderedSet, Map } from 'immutable';
import { IItem } from '../interfaces/IItem';

export interface IAppState {
  itemIds: OrderedSet<string>;
  items: Map<string, IItem>;
}
