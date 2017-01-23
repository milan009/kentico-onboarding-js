import { combineReducers } from 'redux';
import items from './items';

const app = combineReducers({
  items,
});

export default app;
