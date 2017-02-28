import { combineReducers } from 'redux';

import { listReducer } from './listReducer';

const rootReducer = combineReducers({
  items: listReducer,
});

export { rootReducer };
