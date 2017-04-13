
// TODO: check all status codes

export const checkStatus = (response: Response) => {
  if (response.status === 200 || response.status === 201) {
    return response.json();
  }
  if (response.status === 204) {
    return response.statusText;
  }
  if (response.status < 500) {
    return response.json()
      .then(error => {
        throw Object.keys(error.modelState).reduce((prev, key) => prev.concat(error.modelState[key]), []);
      });
  }
  throw ['Internal server error'];
};
