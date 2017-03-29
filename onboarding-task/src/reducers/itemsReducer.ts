import {itemsDataReducer} from './itemsDataReducer';
import {itemsFlagReducer} from './itemsFlagReducer';
import {itemsOrderReducer} from './itemsOrderReducer';
import {combineReducers} from 'redux';

const itemsReducer =  combineReducers({
  itemsDataReducer,
  itemsOrderReducer,
  itemsFlagReducer
});

export { itemsReducer };
