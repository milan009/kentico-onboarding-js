import { Item } from '../models/Item';
import { Map } from 'immutable';
import { IItemUi } from './IItemUi';

export interface IItems {
  byId: Map<string, Item>;
  byUiProperties: Map<string, IItemUi>;
}
