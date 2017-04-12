import { OrderedSet } from 'immutable';

export interface IAppState {
  itemIds: OrderedSet<string>;
}
