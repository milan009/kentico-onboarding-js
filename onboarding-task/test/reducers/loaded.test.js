import { loaded } from '../../src/reducers/loaded.ts';
import { fetchItemsSuccess, fetchItemsRequest, fetchItemsFailure } from '../../src/actions/actionCreators.ts';

describe('loaded reducer', () => {
  const UNKNOWN_ACTION = 'uknown action';
  const fetchItemsSuccessAction = fetchItemsSuccess(JSON.empty);
  const fetchItemsRequestAction = fetchItemsRequest();
  const fetchItemsFailureAction = fetchItemsFailure(new Error('error'));

  it('should return initial state on unknown action', () => {
    const expectedState = false;
    const actualState = loaded(undefined, UNKNOWN_ACTION);

    expect(actualState).toEqual(expectedState);
  });

  it('should handle FETCH_ITEMS_REQUEST action', () => {
    const expectedState = false;
    const actualState = loaded(undefined, fetchItemsRequestAction);

    expect(actualState).toEqual(expectedState);
  });

  it('should handle FETCH_ITEMS_SUCCESS action', () => {
    const expectedState = true;
    const actualState = loaded(undefined, fetchItemsSuccessAction);

    expect(actualState).toEqual(expectedState);
  });

  it('should handle FETCH_ITEMS_FAILURE action', () => {
    const expectedState = true;
    const actualState = loaded(undefined, fetchItemsFailureAction);

    expect(actualState).toEqual(expectedState);
  });
});
