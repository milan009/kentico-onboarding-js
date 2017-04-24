export function checkStatus<TSuccess>(response: Response, serverErrorMessage = 'Internal server error'): Promise<TSuccess | string[]> {
  if (response.status === 200 || response.status === 201) {
    return response.json() as Promise<TSuccess>;
  }
  if (response.status === 204) {
    return Promise.resolve([response.statusText]);
  }
  if (response.status < 500) {
    return response.json()
      .then(error => {
        return Promise.reject(Object.keys(error.modelState).reduce((prev, key) => prev.concat(error.modelState[key]), []));
      });
  }
  return Promise.reject([serverErrorMessage]);
};
