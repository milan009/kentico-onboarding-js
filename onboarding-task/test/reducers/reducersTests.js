import * as matchers from 'jest-immutable-matchers';

const reducersTests = (reducer, specs) => () => {
  beforeEach(() => jest.addMatchers(matchers));

  it('undefined action does not change state', () => {
    const expectedState = 'no change';

    const actualState = reducer(expectedState, { });

    expect(actualState).toBe(expectedState);
  });

  it('unknown action does not change state', () => {
    const expectedState = 'no change';

    const actualState = reducer(expectedState, { type: 'NOTKNOWN_ACTION' });

    expect(actualState).toBe(expectedState);
  });

  specs();
};

export default reducersTests;
