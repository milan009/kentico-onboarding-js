import {
  fetchItemsFailure,
  fetchItemsRequest,
  fetchItemsSuccess
} from '../../src/actionCreators/fetchItemsActionCreators.ts';
import {
  FETCH_ITEMS_FAILURE,
  FETCH_ITEMS_REQUEST,
  FETCH_ITEMS_SUCCESS
} from '../../src/constants/actionTypes.ts';

describe('fetchItemsActionCreators ', () => {
  it(`${fetchItemsRequest} returns correct ${FETCH_ITEMS_REQUEST} action`, () => {
    const expectedAction = { type: FETCH_ITEMS_REQUEST, payload: {} };
    const actualAction = fetchItemsRequest();

    expect(actualAction).toEqual(expectedAction);
  });

  it(`${fetchItemsSuccess} returns correct ${FETCH_ITEMS_SUCCESS} action with given response`, () => {
    const expectedAction = { type: FETCH_ITEMS_SUCCESS, payload: { response: 'test' } };
    const actualAction = fetchItemsSuccess('test');

    expect(actualAction).toEqual(expectedAction);
  });

  it(`${fetchItemsFailure} returns correct ${FETCH_ITEMS_FAILURE} action with given response`, () => {
    const expectedAction = { type: FETCH_ITEMS_FAILURE, payload: { response: 'test' } };
    const actualAction = fetchItemsFailure('test');

    expect(actualAction).toEqual(expectedAction);
  });
});
