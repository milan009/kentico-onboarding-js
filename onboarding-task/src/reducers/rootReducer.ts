import { combineReducers } from 'redux';
import { itemsReducer } from './itemsReducer';
import { itemIdsReducer } from './itemIdsReducer';

const rootReducer = combineReducers({
  items: itemsReducer,
  itemIds: itemIdsReducer,
});

export { rootReducer };
