import { itemsReducer } from './itemsReducer';
import { itemFlagsMapReducer } from './itemFlagsMapReducer';
import { IAction } from '../../actions/actionInterface';
import { OrderedMap } from 'immutable';
import { IItemFlagsRecord } from '../../models/ItemFlags';
import { IItemDataRecord } from '../../models/ItemData';


export const listReducer = (state = {itemsById: OrderedMap<string, IItemDataRecord>(), itemFlagsMap: OrderedMap<string, IItemFlagsRecord>()}, action: IAction) => ({
  itemsById: itemsReducer(state.itemsById, action),
  itemFlagsMap: itemFlagsMapReducer(state.itemFlagsMap, action)
});


/*
export const listReducer = combineReducers({
  itemsById: itemsReducer,
  itemFlagsMap: itemFlagsMapReducer,
});

*/
