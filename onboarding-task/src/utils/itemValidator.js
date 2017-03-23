function validateItemText(text) {  // might be part of validateItem() later, if other params are added
  const error = {
    isValid: true,
    messages: [],
  };
  if (text === null) {
    error.isValid = false;
    error.messages = [...error.messages, 'Value cannot be null'];
    return error;
  }
  if (text === undefined) {
    error.isValid = false;
    error.messages = [...error.messages, 'Value cannot be undefined'];
    return error;
  }
  if (!text.match(/\S/)) {
    error.isValid = false;
    error.messages = [...error.messages, 'Item text should not be empty'];
  }
  return error;
}

export { validateItemText };
