import { CREATE_ERROR_MESSAGE, DELETE_ERROR_MESSAGE, FETCH_ITEMS_FAIL } from '../actions/actionTypes';
import { IAction } from '../actions/IAction';
import { OrderedMap } from 'immutable';

const errorMessages = (state = OrderedMap(), action: IAction) => {
  switch (action.type) {
    case CREATE_ERROR_MESSAGE:
      return state.set(action.payload.error.id, action.payload.error);

    case DELETE_ERROR_MESSAGE:
      return state.delete(action.payload.id);

    case FETCH_ITEMS_FAIL:
      return state.set(action.payload.error.id, action.payload.error);

    default:
      return state;
  }
};

export { errorMessages };
