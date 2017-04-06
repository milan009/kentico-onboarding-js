import { v4 } from 'uuid';
import { CREATE_ERROR_MESSAGE, DELETE_ERROR_MESSAGE } from './actionTypes';
import { ErrorMessage } from '../models/ErrorMessage';


function createErrorMessageFactory(idGenerator: any) {
  return (error: Error) => {
    return {
      type: CREATE_ERROR_MESSAGE,
      payload: {
        error: new ErrorMessage({
          message: error.message,
          id: idGenerator(),
        }),
      }
    };
  };
}

function deleteErrorMessage(id: string) {
  return {
    type: DELETE_ERROR_MESSAGE,
    payload: {
      id,
    }
  };
}

const createErrorMessage = createErrorMessageFactory(v4);

export { createErrorMessageFactory, createErrorMessage, deleteErrorMessage };
