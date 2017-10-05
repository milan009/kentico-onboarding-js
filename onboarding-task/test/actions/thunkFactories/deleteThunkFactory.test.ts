import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import 'isomorphic-fetch';

import { deleteStoredItemFactory } from '../../../src/actions/thunkFactories/deleteThunkFactory';
import {
  DELETE_REQUEST_FAIL,
  DELETE_REQUEST_STARTED,
  DELETE_REQUEST_SUCCESS
} from '../../../src/actions/actionTypes';

describe('Delete thunk factory', () => {
  const middleware = [thunk];
  const mockStore = configureMockStore(middleware);

  const mockId = '17';
  const mockOkResponse = new Response(null, {status: 200});
  const mockNokResponse = new Response(null, {status: 500});

  const mockFetchFactory = (response: any) => (_: any, __: any) => Promise.resolve(response);

  it(`dispatches "${DELETE_REQUEST_STARTED}" and "${DELETE_REQUEST_SUCCESS}" action with given id and OK response`, () => {
    const store = mockStore({});
    const expectedActions = [
      {
        type: DELETE_REQUEST_STARTED,
        payload: {
          id: mockId,
        },
      },
      {
        type: DELETE_REQUEST_SUCCESS,
        payload: {
          id: mockId,
        },
      },
    ];

    const deleteStoredItemThunk = deleteStoredItemFactory(mockFetchFactory(mockOkResponse));
    const resultingPromise = store.dispatch(deleteStoredItemThunk(mockId));

    resultingPromise.then(() => expect(store.getActions()).toEqual(expectedActions));
  });

  it(`dispatches "${DELETE_REQUEST_STARTED}" and "${DELETE_REQUEST_FAIL}" action with given id and NOK response`, () => {
    const store = mockStore({});
    const expectedActions = [
      {
        type: DELETE_REQUEST_STARTED,
        payload: {
          id: mockId,
        },
      },
      {
        type: DELETE_REQUEST_FAIL,
        payload: {
          error: new Error(`${mockNokResponse.status}: ${mockNokResponse.statusText}`),
        },
      },
    ];

    const deleteStoredItemThunk = deleteStoredItemFactory(mockFetchFactory(mockNokResponse));
    const resultingPromise = store.dispatch(deleteStoredItemThunk(mockId));

    return resultingPromise.then(() => expect(store.getActions()).toEqual(expectedActions));
  });
});

