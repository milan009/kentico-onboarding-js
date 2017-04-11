import { isValid } from '../../../src/utils/validationHelpers/itemValidationHelpers.ts';

describe('itemValidationHelpers ', () => {
  it('isValid given empty string returns false', () => {
    const actualResult = isValid('');

    expect(actualResult).toEqual(false);
  });

  it('isValid given undefined returns false', () => {
    const actualResult = isValid(undefined);

    expect(actualResult).toEqual(false);
  });

  it('isValid given null returns false', () => {
    const actualResult = isValid(null);

    expect(actualResult).toEqual(false);
  });

  it('isValid given nonEmpty string returns true', () => {
    const actualResult = isValid('test');

    expect(actualResult).toEqual(true);
  });
});
