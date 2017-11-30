import 'isomorphic-fetch';

import {
  putSavedItemFactory,
} from '../../../src/actions/thunkFactories/updateItemThunkFactory';
import {
  PUT_REQUEST_STARTED,
  PUT_REQUEST_FAIL,
  PUT_REQUEST_SUCCESS, POST_REQUEST_STARTED
} from '../../../src/actions/actionTypes';
import { ItemData } from '../../../src/models/ItemData';
import { ThunkAction } from '../../../src/interfaces/IAction';

describe('Put thunk factory', () => {
  const mockItem = new ItemData({id: '17', text: 'Popcorn bucket'});
  const mockOkResponse = new Response(JSON.stringify(mockItem), {status: 200});
  const mockNokResponse = new Response(null, {status: 500});

  const mockPutThunk: ThunkAction = (_: never) => Promise.resolve({
    type: POST_REQUEST_STARTED, payload: {
      item: mockItem,
      id: mockItem.id,
    }
  });

  const mockPutThunkFactory = (_: never) =>
    (___: never) => mockPutThunk;

  it(`dispatches "${PUT_REQUEST_STARTED}" and "${PUT_REQUEST_SUCCESS}" action with given item and OK response`, async () => {
    const expectedActions = [
      {
        type: PUT_REQUEST_STARTED,
        payload: {
          id: mockItem.id,
          item: mockItem,
        },
      },
      {
        type: PUT_REQUEST_SUCCESS,
        payload: {
          id: mockItem.id,
          item: {
            id: mockItem.id,
            text: mockItem.text
          },
        },
      },
    ];
    const putSavedItemThunk = putSavedItemFactory({
      fetch: jest.fn(() => (mockOkResponse)),
      putThunkActionFactory: putSavedItemFactory,
    });
    const dispatch = jest.fn();
    const getState = jest.fn();

    await putSavedItemThunk(mockItem)(dispatch, getState, {});

    expect(dispatch.mock.calls[0][0]).toEqual(expectedActions[0]);
    expect(dispatch.mock.calls[1][0]).toEqual(expectedActions[1]);
  });

  it(`dispatches "${PUT_REQUEST_STARTED}" and "${PUT_REQUEST_FAIL}" action with given item and NOK response`, async () => {
    const expectedActions = [
      {
        type: PUT_REQUEST_STARTED,
        payload: {
          id: mockItem.id,
          item: mockItem,
        },
      },
      {
        type: PUT_REQUEST_FAIL,
        payload: {
          error: new Error(`${mockNokResponse.status}: ${mockNokResponse.statusText}`),
          id: mockItem.id,
          retryAction: mockPutThunk,
        },
      },
    ];
    const putSavedItemThunk = putSavedItemFactory({
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
