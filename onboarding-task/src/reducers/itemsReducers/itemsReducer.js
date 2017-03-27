import { combineReducers } from 'redux';
import { itemsByIdReducer } from './itemsByIdReducer.js';
import { itemsUiPropertiesReducer } from './itemsUiPropertiesReducer.js';

const itemsReducer = combineReducers({
  byId: itemsByIdReducer,
  uiProperties: itemsUiPropertiesReducer,
});

export { itemsReducer };
