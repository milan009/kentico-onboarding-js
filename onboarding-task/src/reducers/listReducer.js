import { combineReducers } from 'redux';

import { itemsReducer } from './itemsReducer';
import { itemsOrderReducer } from './itemsOrderReducer';

const listReducer = combineReducers({
  byId: itemsReducer,
  orderedIds: itemsOrderReducer,
});

export { listReducer };
