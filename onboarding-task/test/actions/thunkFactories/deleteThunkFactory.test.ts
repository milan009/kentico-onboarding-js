import 'isomorphic-fetch';

import {
  deleteStoredItemFactory,
} from '../../../src/actions/thunkFactories/deleteThunkFactory';
import {
  DELETE_REQUEST_FAIL,
  DELETE_REQUEST_STARTED,
  DELETE_REQUEST_SUCCESS
} from '../../../src/actions/actionTypes';
import { ThunkAction } from '../../../src/interfaces/IAction';

describe('Delete thunk factory', () => {
  const mockId = '17';
  const mockOkResponse = new Response(null, {status: 200});
  const mockNokResponse = new Response(null, {status: 500});

  const mockDeleteThunk: ThunkAction = (_: never) => Promise.resolve({
    type: DELETE_REQUEST_STARTED,
    payload: {
      id: mockId,
    },
  });

  it(`dispatches "${DELETE_REQUEST_STARTED}" and "${DELETE_REQUEST_SUCCESS}" actions with given id and OK response`, async () => {
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
      fetch: jest.fn(() => Promise.resolve(mockOkResponse)),
      deleteThunkActionFactory: deleteStoredItemFactory,
    });
    const dispatch = jest.fn();
    const getState = jest.fn();

    await deleteStoredItemThunk(mockId)(dispatch, getState, {});

    expect(dispatch.mock.calls[0][0]).toEqual(expectedActions[0]);
    expect(dispatch.mock.calls[1][0]).toEqual(expectedActions[1]);
  });

  it(`dispatches "${DELETE_REQUEST_STARTED}" and "${DELETE_REQUEST_FAIL}" action with given id and NOK response`, async () => {
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
      fetch: jest.fn(() => Promise.resolve(mockNokResponse)),
      deleteThunkActionFactory: jest.fn(() => () => mockDeleteThunk),
    });
    const dispatch = jest.fn();
    const getState = jest.fn();

    await deleteItemThunk(mockId)(dispatch, getState, {});

    expect(dispatch.mock.calls[0][0]).toEqual(expectedActions[0]);
    expect(dispatch.mock.calls[1][0]).toEqual(expectedActions[1]);
  });
});

