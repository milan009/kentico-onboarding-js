import {itemDataReducer} from './itemDataReducer';
import {itemFlagReducer} from './itemFlagReducer';
import {itemOrderReducer} from './itemOrderReducer';
import {combineReducers} from 'redux';

const itemReducer =  combineReducers({
  itemDataReducer,
  itemOrderReducer,
  itemFlagReducer
});

export { itemReducer };
