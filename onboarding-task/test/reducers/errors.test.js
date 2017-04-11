import { errors } from '../../src/reducers/errors.ts';
import { Set } from 'immutable';
import { postItemFailure, fetchItemsFailure } from '../../src/actions/actionCreators.ts'

describe('errors reducer', () => {
  const UNKNOWN_ACTION = 'uknown action';
  const fetchItemsFailureAction = fetchItemsFailure(new Error('error'));
  const postItemFailureAction = postItemFailure(new Error('error'));

  it('should return initial state on unknown action', () => {
    const expectedState = Set();
    const actualState = errors(undefined, UNKNOWN_ACTION);

    expect(actualState).toEqual(expectedState);
  });

  it('should handle FETCH_ITEMS_FAILURE action', () => {
    const expectedState = Set([new Error('error')]);
    const actualState = errors(undefined, fetchItemsFailureAction);

    expect(actualState).toEqual(expectedState);
  });

  it('should handle POST_ITEM_FAILURE action', () => {
    const expectedState = Set([new Error('error')]);
    const actualState = errors(undefined, postItemFailureAction);

    expect(actualState).toEqual(expectedState);
  });
});
