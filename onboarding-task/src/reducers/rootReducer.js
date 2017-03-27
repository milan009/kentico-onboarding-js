import { combineReducers } from 'redux';
import { itemsByIdReducer } from './itemsByIdReducer.js';
import { itemsUiPropertiesReducer } from './itemsUiPropertiesReducer.js';

const rootReducer = combineReducers({
  itemsById: itemsByIdReducer,
  itemsUiProperties: itemsUiPropertiesReducer,
});

export { rootReducer };
