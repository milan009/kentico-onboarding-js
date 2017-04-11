import { v4 } from 'uuid';
import { createErrorMessageFactory } from './createErrorMessageFactory';
import { DELETE_ERROR_MESSAGE } from './actionTypes';

function deleteErrorMessage(id: string) {
  return {
    type: DELETE_ERROR_MESSAGE,
    payload: {
      id,
    }
  };
}

const createErrorMessage = createErrorMessageFactory(v4);

export { createErrorMessage, deleteErrorMessage };
