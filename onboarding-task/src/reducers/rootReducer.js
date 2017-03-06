import { combineReducers } from 'redux';

import { itemsReducer } from './itemsReducers/itemsReducer';

const rootReducer = combineReducers({
  items: itemsReducer,
});

export { rootReducer };
