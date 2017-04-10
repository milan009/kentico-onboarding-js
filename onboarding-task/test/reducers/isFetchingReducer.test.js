import {
  fetchItemsRequest,
  fetchItemsFailure,
  fetchItemsSuccess,
} from '../../src/actionCreators/fetchItemsActionCreators.ts';
import { isFetchingReducer } from '../../src/reducers/itemsReducers/itemsReducer.ts';
import {
  FETCH_ITEMS_REQUEST,
  FETCH_ITEMS_FAILURE,
  FETCH_ITEMS_SUCCESS
} from '../../src/constants/actionTypes.ts';

describe('isFetchingReducer ', () => {
  it(`returns true when ${FETCH_ITEMS_REQUEST} action is dispatched`, () => {
    const actualResult = isFetchingReducer(true, fetchItemsRequest());

    expect(actualResult).toEqual(true);
  });

  it(`returns false when ${FETCH_ITEMS_FAILURE} or ${FETCH_ITEMS_SUCCESS} is dispatched`, () => {
    const actualFailureResult = isFetchingReducer(true, fetchItemsFailure('test'));
    const actualSuccessResult = isFetchingReducer(true, fetchItemsSuccess([]));

    expect(actualFailureResult).toEqual(false);
    expect(actualSuccessResult).toEqual(false);
  });

  it('returns false when an unknown action is dispatched', () => {
    const actualResult = isFetchingReducer(true, { type: 'UNKNOWN_ACTION' });

    expect(actualResult).toEqual(false);
  });
});
