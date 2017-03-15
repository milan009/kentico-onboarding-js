function validateItemText(text) {  // might be part of validateItem() later, if other params are added
  if (!text.match(/\S/)) {
    return {
      errors: true,
      message: 'Enter non-empty text',
    };
  }
  return { errors: false };
}

export { validateItemText };
