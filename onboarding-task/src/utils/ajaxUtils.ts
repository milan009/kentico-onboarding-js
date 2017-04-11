const createError = (response: Response) =>
  new Error(`Response from server: ${response.status} : ${response.statusText} \n ${response.body}`);

function parseResponse(response: Response) {
  return new Promise((resolve, reject) => {
    if (response.ok) {
      resolve(response.json());
    }else {
      reject(createError(response));
    }
  });
}

export { parseResponse };
