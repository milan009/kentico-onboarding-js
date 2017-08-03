const isNotEmpty = (str: string): boolean =>
  !!str.trim();

const isNotFalsy = (str: string): boolean =>
  !!str;

export const isStringValid = (str: string): boolean =>
  isNotFalsy(str) && isNotEmpty(str);
