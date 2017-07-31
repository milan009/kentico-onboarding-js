import { listReducer } from './list/listReducer';

export const rootReducer = (state = {}, action) => ({
  list: listReducer(state.list, action),
});
