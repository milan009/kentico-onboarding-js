function validateItemText(text) {  // might be part of validateItem() later, if other params are added
  const error = {
    isValid: true,
    messages: [],
  };
  if (!text.match(/\S/)) {
    error.isValid = false;
    error.messages = [...error.messages, 'Item text should not be empty'];
  }
  return error;
}

export { validateItemText };
