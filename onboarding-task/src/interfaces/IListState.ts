import { IItemFlags } from './IItemFlags';
import { IItemRecord } from './IItemRecord';
import * as Immutable from 'immutable';

export interface IListState {
    itemsOrder: Immutable.List<string>;
    itemsFlags: Immutable.Map<string, IItemFlags>;
    itemsById: Immutable.Map<string, IItemRecord>;
}