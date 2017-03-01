import { combineReducers } from 'redux';

import { itemsReducer } from './itemsReducer';
import { itemsOrderReducer } from './itemsOrderReducer';
import { uiPropsReducer } from './uiPropsReducer';

const listReducer = combineReducers({
  byId: itemsReducer,
  orderedIds: itemsOrderReducer,
  uiPropsById: uiPropsReducer,
});

export { listReducer };
