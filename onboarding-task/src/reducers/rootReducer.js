import { listReducer } from './list/listReducer';

export const rootReducer = (state = {}, action) => ({
  items: listReducer(state.items, action),
});
