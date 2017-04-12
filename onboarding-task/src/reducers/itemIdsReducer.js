import { OrderedSet } from 'immutable';
import { ADD_ITEM, DELETE_ITEM } from '../constants/actionTypes.ts';

const itemIdsReducer = (state = OrderedSet(), action) => {
  switch (action.type) {
    case ADD_ITEM:
      return state.add(action.payload.id);

    case DELETE_ITEM: {
      return state.delete(action.payload.id);
    }

    default:
      return state;
  }
};

export { itemIdsReducer };
