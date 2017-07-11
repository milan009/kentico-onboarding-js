
import { combineReducers } from 'redux';
import { itemsReducer } from './ItemDataReducers/itemsReducer';
import { itemInfosReducer } from './ItemInfoReducers/itemInfosReducer';

export const listReducer = combineReducers({
  items: itemsReducer,
  itemInfos: itemInfosReducer,
});

