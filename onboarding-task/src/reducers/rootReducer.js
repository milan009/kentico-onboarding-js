import { listReducer } from './listReducer';

export const rootReducer = (state = {}, action) => {
  return {
    list: listReducer(state.list, action),
  };
};
