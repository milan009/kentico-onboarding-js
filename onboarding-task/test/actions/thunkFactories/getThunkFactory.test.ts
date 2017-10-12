import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import 'isomorphic-fetch';

import { getItemsFactory } from '../../../src/actions/thunkFactories/getThunkFactory';
import {
  FETCH_STARTED,
  FETCH_FAIL,
  FETCH_SUCCESS, PARSE_RESPONSE_STARTED, PARSE_RESPONSE_FINISHED,
} from '../../../src/actions/actionTypes';
import { OrderedMap } from 'immutable';
import { ItemData } from '../../../src/models/ItemData';

describe('Get thunk factory', () => {
  const mockItems = [
    {id: '17', text: 'Popcorn bucket'},
    {id: '71', text: 'Not-so-much-popcorn bucket'}
  ];
  const mockParsedItems = OrderedMap([
    [
      '17',
      new ItemData({
        id: '17',
        text: 'Popcorn bucket',
      }),
    ],
    [
      '71',
      new ItemData({
        id: '71',
        text: 'Not-so-much-popcorn bucket',
      }),
    ],
  ]);

  const middleware = [thunk];
  const mockStore = configureMockStore(middleware);

  const mockFetchFactory = (response: Response) => (_: any, __: ResponseInit) => Promise.resolve(response);

  const mockOkResponse = new Response(JSON.stringify(mockItems), {status: 200});
  const mockNokResponse = new Response(null, {status: 500});

  it(`dispatches "${FETCH_STARTED}","${FETCH_SUCCESS}","${PARSE_RESPONSE_STARTED}" and "${PARSE_RESPONSE_FINISHED}" action with OK response`, () => {
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
      {
        type: PARSE_RESPONSE_STARTED,
        payload: {
          jsonResponse: mockItems,
        },
      },
      {
        type: PARSE_RESPONSE_FINISHED,
        payload: {
          parsedItems: mockParsedItems,
        },
      },
    ];

    const getItemsThunk = getItemsFactory(mockFetchFactory(mockOkResponse));
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
          error: new Error(`${mockNokResponse.status}: ${mockNokResponse.statusText}`),
        },
      },
    ];

    const getSavedItemThunk = getItemsFactory(mockFetchFactory(mockNokResponse));
    const resultingPromise = store.dispatch(getSavedItemThunk());

    resultingPromise.then(() => expect(store.getActions()).toEqual(expectedActions));
  });
});

