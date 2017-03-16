import { Map, List} from 'immutable';

import { ItemUiPropsRecord } from '../models/ItemUiPropsRecord';
import { ItemRecord } from '../models/ItemRecord';

export interface IItems {
  byId: Map<string, ItemRecord>;
  orderedIds: List<string>;
  uiPropsById: Map<string, ItemUiPropsRecord>;
  isFetching: boolean;
  error?: string;
  successMessage: string;
}
