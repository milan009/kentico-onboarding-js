import { combineReducers } from 'redux';

import { itemsByIdsReducer } from './itemsByIdsReducer';
import { itemsOrderReducer } from './itemsOrderReducer';
import { itemsUiPropsReducer } from './itemsUiPropsReducer';

const itemsReducer = combineReducers({
  byId: itemsByIdsReducer,
  orderedIds: itemsOrderReducer,
  uiPropsById: itemsUiPropsReducer,
});

export { itemsReducer };
