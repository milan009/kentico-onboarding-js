import { CREATE_ERROR_MESSAGE, DELETE_ERROR_MESSAGE, FETCH_ITEMS_FAIL } from '../actions/actionTypes';
import { IAction } from '../actions/IAction';
import { OrderedMap } from 'immutable';
import { ErrorMessage } from '../models/ErrorMessage';

const errorMessages = (state = OrderedMap(), action: IAction) => {
  switch (action.type) {
    case CREATE_ERROR_MESSAGE:
    case FETCH_ITEMS_FAIL:
      const receivedError: ErrorMessage = action.payload.error;
      return state.set(receivedError.id, receivedError);

    case DELETE_ERROR_MESSAGE:
      return state.delete(action.payload.id);

    default:
      return state;
  }
};

export { errorMessages };
