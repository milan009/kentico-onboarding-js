import { combineReducers } from 'redux';

import { itemsByIdsReducer } from './itemsByIdsReducer';
import { itemsOrderReducer } from './itemsOrderReducer';
import { uiPropsReducer } from './uiPropsReducer';

const listReducer = combineReducers({
  byId: itemsByIdsReducer,
  orderedIds: itemsOrderReducer,
  uiPropsById: uiPropsReducer,
});

export { listReducer };
