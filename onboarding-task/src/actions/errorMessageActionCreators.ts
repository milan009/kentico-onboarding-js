import { v4 } from 'uuid';
import { CREATE_ERROR_MESSAGE } from './actionTypes';
import { ErrorMessage } from '../models/ErrorMessage';


function createErrorMessageWithoutDependency(idGenerator: any) {
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

const createErrorMessage = createErrorMessageWithoutDependency(v4);

export { createErrorMessageWithoutDependency, createErrorMessage };
