const createError = (response: any) => {
  let errorMessage = '';
  for (let property in response.modelState) {
    if (response.modelState[property]) {
      errorMessage += `${response.modelState[property]}.\n`;
    }
  }

  return new Error(errorMessage);
};

const createServerUnavailableError = () =>
  new Error('Server unavailable. Try again later.');

function parseResponse(response: Response) {
  return new Promise((resolve, reject) => {
    if (response.ok) {
      resolve(response.json());
    }else {
      switch (response.status) {
        case 400:
          response.json().then((body) => reject(createError(body)));
          break;
        default:
          reject(createServerUnavailableError());
      }
    }
  });
}

export { parseResponse };
