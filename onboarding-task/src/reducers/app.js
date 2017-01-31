import { combineReducers } from 'redux';
import items from './items';
import editedItems from './editedItems';

const app = combineReducers({
  items,
  editedItems,
});

export default app;
