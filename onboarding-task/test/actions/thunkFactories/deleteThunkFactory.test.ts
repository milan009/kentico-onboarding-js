import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import 'isomorphic-fetch';

import {
  deleteStoredItemFactory,
  DeleteThunkActionFactory
} from '../../../src/actions/thunkFactories/deleteThunkFactory';
import {
  DELETE_REQUEST_FAIL,
  DELETE_REQUEST_STARTED,
  DELETE_REQUEST_SUCCESS
} from '../../../src/actions/actionTypes';
import { ThunkAction } from '../../../src/interfaces/IAction';

describe('Delete thunk factory', () => {
  const middleware = [thunk];
  const mockStore = configureMockStore(middleware);

  const mockId = '17';
  const mockOkResponse = new Response(null, {status: 200});
  const mockNokResponse = new Response(null, {status: 500});

  const mockFetchFactory = (response: Response) => (_: any, __: ResponseInit) => Promise.resolve(response);

  const mockDeleteThunk: ThunkAction = (_: never) => Promise.resolve({
    type: DELETE_REQUEST_STARTED,
    payload: {
      id: mockId,
    },
  });

  const mockDeleteThunkFactory: DeleteThunkActionFactory = (_: never) =>
    (___: never) => mockDeleteThunk;

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

    const deleteStoredItemThunk = deleteStoredItemFactory({
      fetch: mockFetchFactory(mockOkResponse),
      deleteThunkActionFactory: deleteStoredItemFactory,
    });
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
          retryAction: mockDeleteThunk,
          error: new Error(`${mockNokResponse.status}: ${mockNokResponse.statusText}`),
          id: mockId,
        },
      },
    ];

    const deleteItemThunk = deleteStoredItemFactory({
      fetch: mockFetchFactory(mockNokResponse),
      deleteThunkActionFactory: mockDeleteThunkFactory
    });
    const resultingPromise = store.dispatch(deleteItemThunk(mockId));

    return resultingPromise.then(() => expect(store.getActions()).toEqual(expectedActions));
  });
});

