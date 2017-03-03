import {OrderedMap, Set} from 'immutable';
import {IItem} from '../models/Item';

interface IAppState {
  items: OrderedMap<string, IItem>;
  editedItems: Set<string>;
}

export {IAppState}
