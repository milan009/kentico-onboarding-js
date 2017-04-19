import { errors } from '../../src/reducers/errors.ts';
import { List } from 'immutable';
import { postItemFailure, fetchItemsFailure, deleteError } from '../../src/actions/actionCreators.ts';

describe('errors reducer', () => {
  const UNKNOWN_ACTION = 'uknown action';
  const fetchItemsFailureAction = fetchItemsFailure(new Error('second error'));
  const postItemFailureAction = postItemFailure(new Error('second error'));
  const deleteErrorAction = deleteError(0);
  const stateBefore = List(['first error']);
  it('should return initial state on unknown action', () => {
    const expectedState = List(['first error']);
    const actualState = errors(stateBefore, UNKNOWN_ACTION);

    expect(actualState).toEqual(expectedState);
  });

  it('should handle FETCH_ITEMS_FAILURE action', () => {
    const expectedState = List(['first error', 'second error']);
    const actualState = errors(stateBefore, fetchItemsFailureAction);

    expect(actualState).toEqual(expectedState);
  });

  it('should handle POST_ITEM_FAILURE action', () => {
    const expectedState = List(['first error', 'second error']);
    const actualState = errors(stateBefore, postItemFailureAction);

    expect(actualState).toEqual(expectedState);
  });

  it('should handle POST_ITEM_FAILURE action', () => {
    const expectedState = List(['first error', 'second error']);
    const actualState = errors(stateBefore, postItemFailureAction);

    expect(actualState).toEqual(expectedState);
  });

  it('should handle DELETE_ERROR action', () => {
    const expectedState = List();
    const actualState = errors(stateBefore, deleteErrorAction);

    expect(actualState).toEqual(expectedState);
  });
});
