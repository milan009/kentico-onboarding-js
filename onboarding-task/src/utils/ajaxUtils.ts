import { generateUuid } from './idGenerator';
import { IErrorResponse } from '../models/IErrorResponse';
export function checkStatus<TSuccess>(response: Response, serverErrorMessage = 'Internal server error', generateId: () => string = generateUuid): Promise<TSuccess | IErrorResponse[]> {
  if (response.status === 200 || response.status === 201) {
    return response.json() as Promise<TSuccess>;
  }
  if (response.status === 204) {
    return Promise.resolve();
  }
  if (response.status < 500) {
    return response.json()
      .then(error => {
        return Promise.reject(Object.keys(error.modelState).map(key => ({id: generateId(), text: error.modelState[key]}), []));
      });
  }
  return Promise.reject([{id: generateId(), text: serverErrorMessage}]);
}
