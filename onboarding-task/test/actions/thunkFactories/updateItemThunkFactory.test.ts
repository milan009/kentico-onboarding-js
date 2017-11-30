import 'isomorphic-fetch';

import {
  updateItemThunkFactory,
} from '../../../src/actions/thunkFactories/updateItemThunkFactory';
import {
  UPDATE_REQUEST_STARTED,
  UPDATE_REQUEST_FAIL,
  UPDATE_REQUEST_SUCCESS, CREATE_REQUEST_STARTED
} from '../../../src/actions/actionTypes';
import { ItemData } from '../../../src/models/ItemData';
import { ThunkAction } from '../../../src/interfaces/IAction';

describe('Put thunk factory', () => {
  const mockItem = new ItemData({id: '17', text: 'Popcorn bucket'});
  const mockOkResponse = new Response(JSON.stringify(mockItem), {status: 200});
  const mockNokResponse = new Response(null, {status: 500});

  const mockPutThunk: ThunkAction = (_: never) => Promise.resolve({
    type: CREATE_REQUEST_STARTED, payload: {
      item: mockItem,
      id: mockItem.id,
    }
  });

  const mockPutThunkFactory = (_: never) =>
    (___: never) => mockPutThunk;

  it(`dispatches "${UPDATE_REQUEST_STARTED}" and "${UPDATE_REQUEST_SUCCESS}" action with given item and OK response`, async () => {
    const expectedActions = [
      {
        type: UPDATE_REQUEST_STARTED,
        payload: {
          id: mockItem.id,
          item: mockItem,
        },
      },
      {
        type: UPDATE_REQUEST_SUCCESS,
        payload: {
          id: mockItem.id,
          item: {
            id: mockItem.id,
            text: mockItem.text
          },
        },
      },
    ];
    const putSavedItemThunk = updateItemThunkFactory({
      fetch: jest.fn(() => (mockOkResponse)),
      putThunkActionFactory: updateItemThunkFactory,
    });
    const dispatch = jest.fn();
    const getState = jest.fn();

    await putSavedItemThunk(mockItem)(dispatch, getState, {});

    expect(dispatch.mock.calls[0][0]).toEqual(expectedActions[0]);
    expect(dispatch.mock.calls[1][0]).toEqual(expectedActions[1]);
  });

  it(`dispatches "${UPDATE_REQUEST_STARTED}" and "${UPDATE_REQUEST_FAIL}" action with given item and NOK response`, async () => {
    const expectedActions = [
      {
        type: UPDATE_REQUEST_STARTED,
        payload: {
          id: mockItem.id,
          item: mockItem,
        },
      },
      {
        type: UPDATE_REQUEST_FAIL,
        payload: {
          error: new Error(`${mockNokResponse.status}: ${mockNokResponse.statusText}`),
          id: mockItem.id,
          retryAction: mockPutThunk,
        },
      },
    ];
    const putSavedItemThunk = updateItemThunkFactory({
      fetch: jest.fn(() => mockNokResponse),
      putThunkActionFactory: mockPutThunkFactory,
    });
    const dispatch = jest.fn();
    const getState = jest.fn();

    await putSavedItemThunk(mockItem)(dispatch, getState, {});

    expect(dispatch.mock.calls[0][0]).toEqual(expectedActions[0]);
    expect(dispatch.mock.calls[1][0]).toEqual(expectedActions[1]);
  });
});
