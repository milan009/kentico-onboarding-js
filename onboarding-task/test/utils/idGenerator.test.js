import { generateId } from '../../src/utils/idGenerator.ts';

describe('id Generator', () => {
  it('should return id in specific format', () => {
    const idFormatRE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    expect(generateId()).toMatch(idFormatRE);
  });
});
