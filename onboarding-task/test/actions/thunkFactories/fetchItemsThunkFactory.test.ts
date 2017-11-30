import 'isomorphic-fetch';

import {
  fetchItemsThunkFactory,
} from '../../../src/actions/thunkFactories/fetchItemsThunkFactory';
import {
  FETCH_REQUEST_STARTED,
  FETCH_REQUEST_FAIL,
  FETCH_REQUEST_SUCCESS,
} from '../../../src/actions/actionTypes';
import { ThunkAction } from '../../../src/interfaces/IAction';

describe('Get thunk factory', () => {
  const mockItems = [
    {id: '17', text: 'Popcorn bucket'},
    {id: '71', text: 'Not-so-much-popcorn bucket'}
  ];

  const mockGetThunk: ThunkAction = () => Promise.resolve({
    type: FETCH_REQUEST_STARTED,
  });

  const mockOkResponse = new Response(JSON.stringify(mockItems), {status: 200});
  const mockNokResponse = new Response(null, {status: 500});

  it(`dispatches "${FETCH_REQUEST_STARTED}","${FETCH_REQUEST_SUCCESS} and the parseThunk actions with OK response`, async () => {
    const expectedActions = [
      {
        type: FETCH_REQUEST_STARTED,
      },
      {
        type: FETCH_REQUEST_SUCCESS,
        payload: {
          items: mockItems,
        },
      },
    ];
    const getItemsThunk = fetchItemsThunkFactory({
      fetch: jest.fn(() => Promise.resolve(mockOkResponse)),
      getThunkActionFactory: fetchItemsThunkFactory,
    });
    const dispatch = jest.fn();
    const getState = jest.fn();

    await getItemsThunk()(dispatch, getState, {});

    expect(dispatch.mock.calls[0][0]).toEqual(expectedActions[0]);
    expect(dispatch.mock.calls[1][0]).toEqual(expectedActions[1]);
  });

  it(`dispatches "${FETCH_REQUEST_STARTED}" and "${FETCH_REQUEST_FAIL}" action with NOK response`, async () => {
    const expectedActions = [
      {
        type: FETCH_REQUEST_STARTED,
      },
      {
        type: FETCH_REQUEST_FAIL,
        payload: {
          retryAction: mockGetThunk,
          error: new Error(`${mockNokResponse.status}: ${mockNokResponse.statusText}`),
        },
      },
    ];
    const getSavedItemThunk = fetchItemsThunkFactory({
      fetch: jest.fn(() => mockNokResponse),
      getThunkActionFactory: jest.fn(() => () => mockGetThunk),
    });
    const dispatch = jest.fn();
    const getState = jest.fn();

    await getSavedItemThunk()(dispatch, getState, {});

    expect(dispatch.mock.calls[0][0]).toEqual(expectedActions[0]);
    expect(dispatch.mock.calls[1][0]).toEqual(expectedActions[1]);
  });
});

