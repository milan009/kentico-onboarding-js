import { OrderedSet } from 'immutable';
import { ADD_ITEM, DELETE_ITEM } from '../actions/actionTypes';
import { IAction } from '../actions/IAction';

const itemOrder = (state = OrderedSet(), action: IAction) => {
  switch (action.type) {
    case ADD_ITEM:
      return state.add(action.payload.item.id);

    case DELETE_ITEM:
      return state.delete(action.payload.id);

    default:
      return state;
  }
};

export { itemOrder };
