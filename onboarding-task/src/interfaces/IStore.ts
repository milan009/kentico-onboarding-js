import { ItemsDataMap } from '../reducers/list/itemsReducer';
import { ItemsFlagsMap } from '../reducers/list/itemFlagsMapReducer';

export interface IStore {
  list: {
    isFetching: boolean;
    itemsById: ItemsDataMap;
    itemFlagsMap: ItemsFlagsMap;
  };
}
