import {combineReducers} from 'redux';

import {itemsDataReducer} from './itemsDataReducer';
import {itemsFlagReducer} from './itemsFlagReducer';
import {itemsOrderReducer} from './itemsOrderReducer';

const itemsReducer = combineReducers({
  items: itemsDataReducer,
  itemsOrder: itemsOrderReducer,
  itemsDisplayFlags: itemsFlagReducer
});

export { itemsReducer };
