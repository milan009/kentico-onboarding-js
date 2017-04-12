import { isNotEmpty } from './stringValidationHelpers';

export function isValid(input: string) {
  return isNotEmpty(input);
}
