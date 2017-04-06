import {CREATE_ERROR_MESSAGE, DELETE_ERROR_MESSAGE} from '../actions/actionTypes';
import { IAction } from '../actions/IAction';
import { OrderedMap } from 'immutable';

const errorMessage = (state = OrderedMap(), action: IAction) => {
  switch (action.type) {
    case CREATE_ERROR_MESSAGE:
      return state.set(action.payload.error.id, action.payload.error);

    case DELETE_ERROR_MESSAGE:
      return state.delete(action.payload.id);

    default:
      return state;
  }
};

export { errorMessage };
