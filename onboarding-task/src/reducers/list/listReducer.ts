import { itemsReducer } from './itemsReducer';
import { itemFlagsMapReducer } from './itemFlagsMapReducer';
// import { combineReducers } from 'redux';
import { ItemData } from '../../models/ItemData';
import { OrderedMap } from 'immutable';
import { ItemFlags } from '../../models/ItemFlags';
import { IAction } from '../../actions/actionInterface';

export const listReducer = (state = {itemsById: OrderedMap<string, ItemData>(), itemFlagsMap: OrderedMap<string, ItemFlags>()}, action: IAction) => ({
  itemsById: itemsReducer(state.itemsById, action),
  itemFlagsMap: itemFlagsMapReducer(state.itemFlagsMap, action)
});


/*
export const listReducer = combineReducers({
  itemsById: itemsReducer,
  itemFlagsMap: itemFlagsMapReducer,
});
*/

