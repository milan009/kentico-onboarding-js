import { mockIdGenerator } from './mockIdGenerator';

describe('MockIdGenerator', () => {
  it('generates correct id without given param', () => {
    const expectedId = '00000000-0000-0000-0000-000000000000';

    const createdId = mockIdGenerator();

    expect(createdId).toEqual(expectedId);
  });

  it('generates correct id with given valid param', () => {
    const expectedId = '11850000-0000-0000-0000-000000000000';

    const createdId = mockIdGenerator(1185);

    expect(createdId).toEqual(expectedId);
  });

  it('drops tail of too long id', () => {
    const expectedId = '11857984-0000-0000-0000-000000000000';

    const createdId = mockIdGenerator(1185798452);

    expect(createdId).toEqual(expectedId);
  });

  it('fails on negative value', () => {
    expect(() => (mockIdGenerator(-15))).toThrow();
  });
});
