import { isNotEmpty } from '../../src/utils/validationHelpers/stringValidationHelpers.ts';

describe('stringValidationHelpers ', () => {
  it('isNotEmpty given empty string returns false', () => {
    const actualResult = isNotEmpty('');

    expect(actualResult).toEqual(false);
  });

  it('isNotEmpty given undefined returns false', () => {
    const actualResult = isNotEmpty(undefined);

    expect(actualResult).toEqual(false);
  });

  it('isNotEmpty given null returns false', () => {
    const actualResult = isNotEmpty(null);

    expect(actualResult).toEqual(false);
  });

  it('isNotEmpty given nonEmpty string returns true', () => {
    const actualResult = isNotEmpty('test');

    expect(actualResult).toEqual(true);
  });
});
