import { isValid } from '../../../src/utils/validationHelpers/itemValidationHelpers.ts';

describe('itemValidationHelpers ', () => {
  it('isValid given empty string returns false', () => {
    const actualResult = isValid('');

    expect(actualResult).toBeFalsy();
  });

  it('isValid given undefined returns false', () => {
    const actualResult = isValid(undefined);

    expect(actualResult).toBeFalsy();
  });

  it('isValid given null returns false', () => {
    const actualResult = isValid(null);

    expect(actualResult).toBeFalsy();
  });

  it('isValid given nonEmpty string returns true', () => {
    const actualResult = isValid('test');

    expect(actualResult).toBeTruthy();
  });
});
