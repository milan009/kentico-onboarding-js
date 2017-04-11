function parseResponse<TPayload>(response: Response): Promise<TPayload | Error> {
  if (response.ok) {
    return response.json();
  } else {
    return Promise.reject(new Error(response.statusText));
  }
}

export { parseResponse };
