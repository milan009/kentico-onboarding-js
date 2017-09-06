import { combineReducers } from 'redux';

import { itemsReducer } from './itemsReducer';
import { itemFlagsMapReducer } from './itemFlagsMapReducer';
import { fetchingReducer } from './fetchingReducer';
import { IStore as IListState} from '../../interfaces/IStore';

export const listReducer = combineReducers<IListState>({
  isFetching: fetchingReducer,
  itemsById: itemsReducer,
  itemFlagsMap: itemFlagsMapReducer,
});


