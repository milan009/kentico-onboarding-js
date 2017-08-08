export const isItemTextValid = (string) =>
  isNotFalsy(string) && isNotEmpty(string);

const isNotEmpty = (string) =>
  !!string.trim();

const isNotFalsy = (string) =>
  !!string;
