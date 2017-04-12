import { OrderedMap, Set, OrderedSet } from 'immutable';
import { IItem } from '../models/Item';
import { IErrorMessage } from '../models/ErrorMessage';

interface IAppState {
  items: OrderedMap<string, IItem>;
  editedItems: Set<string>;
  itemsOrder: OrderedSet<string>;
  isFetching: boolean;
  errorMessages: OrderedMap<string, IErrorMessage>;
}

export {IAppState}
