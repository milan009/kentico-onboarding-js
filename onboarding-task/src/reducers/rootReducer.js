import { listReducer } from './list/listReducer';

export const rootReducer = (state = {}, action) => ({
  itemsById: listReducer(state.itemsById, action),
});
