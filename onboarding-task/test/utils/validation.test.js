import { isValidItemText } from '../../src/utils/validation.ts';

describe('"isValidItemText"', () => {
  it('rejects null string', () => {
    const string = null;

    const result = isValidItemText(string);

    expect(result).toBeFalsy();
  });

  it('rejects undefined string', () => {
    const string = undefined;

    const result = isValidItemText(string);

    expect(result).toBeFalsy();
  });

  it('rejects empty string', () => {
    const string = '';

    const result = isValidItemText(string);

    expect(result).toBeFalsy();
  });

  it('rejects whitespace-only string', () => {
    const string = '  \n\n\r ';

    const result = isValidItemText(string);

    expect(result).toBeFalsy();
  });

  it('accepts string with "null" text', () => {
    const string = 'null';

    const result = isValidItemText(string);

    expect(result).toBeTruthy();
  });

  it('accepts string with "undefined" text', () => {
    const string = 'undefined';

    const result = isValidItemText(string);

    expect(result).toBeTruthy();
  });

  it('accepts string with "0" text', () => {
    const string = '0';

    const result = isValidItemText(string);

    expect(result).toBeTruthy();
  });

  it('accepts string starting with whitespaces', () => {
    const string = ' \r\nkukuricka ';

    const result = isValidItemText(string);

    expect(result).toBeTruthy();
  });
});
