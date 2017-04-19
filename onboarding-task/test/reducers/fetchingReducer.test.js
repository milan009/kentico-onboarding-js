import { fetchingReducer } from '../../src/reducers/itemsReducers/fetchingReducer.ts';
import { itParam } from 'mocha-param';
import { GET_ITEMS_REQUEST, GET_ITEMS_SUCCESS, GET_ITEMS_FAILURE } from '../../src/actions/actionTypes.ts';

describe('fetchingReducer', () => {
  const boolParams = [true, false];
  const returnsTrue = [GET_ITEMS_REQUEST];
  const returnsFalse = [GET_ITEMS_SUCCESS, GET_ITEMS_FAILURE];

  itParam('returns previous state from unknown action', boolParams, (prevState) => {
    const resultState = fetchingReducer(prevState, { type: 'unknown' });

    expect(resultState).toEqual(prevState);
  });

  it('returns false for undefined state', () => {
    const resultState = fetchingReducer(undefined, { type: 'unknown' });

    expect(resultState).toEqual(false);
  });

  itParam(`returns true for ${returnsTrue.join(', ')}`, returnsTrue, (type) => {
    const resultState = fetchingReducer(false, { type });

    expect(resultState).toBeTruthy();
  });

  itParam(`returns FALSE for ${returnsFalse.join(', ')}`, returnsFalse, (type) => {
    const resultState = fetchingReducer(true, { type });

    expect(resultState).toBeFalsy();
  });
});
