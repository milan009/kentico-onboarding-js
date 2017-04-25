import { IItems } from './itemsReducers/IItems';
import {OrderedMap} from 'immutable';

export interface IAppState {
  items: IItems;
  errors: OrderedMap<string, string>;
}
