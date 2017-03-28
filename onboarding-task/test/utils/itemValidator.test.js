
import { validateItemText } from '../../src/utils/itemValidator.ts';

describe('Validate item text:', () => {
  it('should be invalid for empty text', () => {
    expect(validateItemText('').isValid).toBeFalsy();
  });

  it('should be invalid for null', () => {
    expect(validateItemText(null).isValid).toBeFalsy();
  });

  it('should be invalid for undefined value', () => {
    expect(validateItemText(undefined).isValid).toBeFalsy();
  });

  it('should be valid for non-empty text', () => {
    expect(validateItemText('testing text').isValid).toBeTruthy();
  });

  it('should return error messages on error', () => {
    expect(validateItemText('').messages.length).toBeGreaterThan(0);
  });
});
