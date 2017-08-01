import { isStringValid } from '../../src/utils/validation';

describe('Validation utility functions', () => {
  describe('String validation', () => {
    it('rejects null string', () => {
      const string = null;
      const expectedResult = false;

      const result = isStringValid(string);

      expect(result).toEqual(expectedResult);
    });

    it('rejects undefined string', () => {
      const string = undefined;
      const expectedResult = false;
      const result = isStringValid(string);

      expect(result).toEqual(expectedResult);
    });

    it('rejects empty string', () => {
      const string = '';
      const expectedResult = false;
      const result = isStringValid(string);

      expect(result).toEqual(expectedResult);
    });

    it('rejects whitespace-only string', () => {
      const string = '  \n\n\r ';
      const expectedResult = false;
      const result = isStringValid(string);

      expect(result).toEqual(expectedResult);
    });

    it('accepts string with "null" text', () => {
      const string = 'null';
      const expectedResult = true;
      const result = isStringValid(string);

      expect(result).toEqual(expectedResult);
    });

    it('accepts string with "undefined" text', () => {
      const string = 'undefined';
      const expectedResult = true;
      const result = isStringValid(string);

      expect(result).toEqual(expectedResult);
    });

    it('accepts string with "0" text', () => {
      const string = '0';
      const expectedResult = true;
      const result = isStringValid(string);

      expect(result).toEqual(expectedResult);
    });

    it('accepts string starting with whitespaces', () => {
      const string = ' \r\nkukuricka ';
      const expectedResult = true;
      const result = isStringValid(string);

      expect(result).toEqual(expectedResult);
    });
  });
});
