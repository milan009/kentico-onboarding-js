import { generateUuid } from '../../src/utils/idGenerator.ts';

describe('Generate uuid:', () => {
  it('should return unique string each run', () => {
    expect(generateUuid()).not.toBe(generateUuid());
  });

  it('should return valid uuid in RFC4122 format', () => {
    expect(generateUuid()).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
  });
});
