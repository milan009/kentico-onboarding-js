import { CREATE_ERROR_MESSAGE } from './actionTypes';
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



export { createErrorMessageFactory };
