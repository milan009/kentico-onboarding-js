import { Map, List} from 'immutable';

import { ItemUiPropsRecord } from '../models/ItemUiPropsRecord';
import { ItemRecord } from '../models/ItemRecord';

export interface IItems {
  readonly byId: Map<string, ItemRecord>;
  readonly orderedIds: List<string>;
  readonly uiPropsById: Map<string, ItemUiPropsRecord>;
  readonly isFetching: boolean;
  readonly error: string;
  readonly successMessage: string;
}
