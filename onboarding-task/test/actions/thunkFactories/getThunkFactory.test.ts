import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import 'isomorphic-fetch';

import {
  getItemsFactory,
  GetThunkActionFactory
} from '../../../src/actions/thunkFactories/getThunkFactory';
import {
  FETCH_STARTED,
  FETCH_FAIL,
  FETCH_SUCCESS,
} from '../../../src/actions/actionTypes';
import { ThunkAction } from '../../../src/interfaces/IAction';

describe('Get thunk factory', () => {
  const mockItems = [
    {id: '17', text: 'Popcorn bucket'},
    {id: '71', text: 'Not-so-much-popcorn bucket'}
  ];

  const middleware = [thunk];
  const mockStore = configureMockStore(middleware);

  const mockFetchFactory = (response: Response) => (_: never, __: never) => Promise.resolve(response);

  const mockGetThunk: ThunkAction = () => Promise.resolve({
    type: FETCH_STARTED,
  });
  const mockGetThunkFactory: GetThunkActionFactory = (_: never) =>
    () => mockGetThunk;

  const mockParseThunk: ThunkAction = () => Promise.resolve();
  const mockParseThunkFactory = (_: never) => mockParseThunk;

  const mockOkResponse = new Response(JSON.stringify(mockItems), {status: 200});
  const mockNokResponse = new Response(null, {status: 500});

  it(`dispatches "${FETCH_STARTED}","${FETCH_SUCCESS}" action with OK response`, () => {
    const store = mockStore({});
    const expectedActions = [
      {
        type: FETCH_STARTED,
      },
      {
        type: FETCH_SUCCESS,
        payload: {
          items: mockItems,
        },
      },
    ];

    const getItemsThunk = getItemsFactory({
      fetch: mockFetchFactory(mockOkResponse),
      getThunkActionFactory: getItemsFactory,
      parseThunkAction: mockParseThunkFactory,
    });
    const resultingPromise = store.dispatch(getItemsThunk());

    return resultingPromise.then(() => expect(store.getActions()).toEqual(expectedActions));
  });

  it(`dispatches "${FETCH_STARTED}" and "${FETCH_FAIL}" action with NOK response`, () => {
    const store = mockStore({});
    const expectedActions = [
      {
        type: FETCH_STARTED,
      },
      {
        type: FETCH_FAIL,
        payload: {
          retryAction: mockGetThunk,
          error: new Error(`${mockNokResponse.status}: ${mockNokResponse.statusText}`),
        },
      },
    ];

    const getSavedItemThunk = getItemsFactory({
      fetch: mockFetchFactory(mockNokResponse),
      getThunkActionFactory: mockGetThunkFactory,
      parseThunkAction: mockParseThunkFactory,
    });
    const resultingPromise = store.dispatch(getSavedItemThunk());

    return resultingPromise.then(() => expect(store.getActions()).toEqual(expectedActions));
  });
});

