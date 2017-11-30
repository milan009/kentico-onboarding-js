import 'isomorphic-fetch';

import {
  postNewItemFactory,
} from '../../../src/actions/thunkFactories/createItemThunkFactory';
import {
  POST_REQUEST_STARTED,
  POST_REQUEST_FAIL,
  POST_REQUEST_SUCCESS
} from '../../../src/actions/actionTypes';
import { ThunkAction } from '../../../src/interfaces/IAction';

describe('Post thunk factory', () => {
  const mockNewText = 'Blop';
  const mockOptimisticId = '17';
  const mockBackendId = '71';

  const mockPostThunk: ThunkAction = (_: never) => Promise.resolve({
    type: POST_REQUEST_STARTED, payload: {
      text: mockNewText,
      optimisticId: mockOptimisticId,
    }
  });
  const mockPostThunkFactory = (_: never) =>
    (___: never) => mockPostThunk;

  const mockOkResponse = new Response(JSON.stringify({id: mockBackendId, text: mockNewText}), {status: 200});
  const mockNokResponse = new Response(null, {status: 500});

  it(`dispatches "${POST_REQUEST_STARTED}" and "${POST_REQUEST_SUCCESS}" action with given text and OK response`, async () => {
    const expectedActions = [
      {
        type: POST_REQUEST_STARTED,
        payload: {
          optimisticId: mockOptimisticId,
          text: mockNewText,
        },
      },
      {
        type: POST_REQUEST_SUCCESS,
        payload: {
          formerId: mockOptimisticId,
          item: {
            id: mockBackendId,
            text: mockNewText,
          },
        },
      },
    ];
    const postItemThunk = postNewItemFactory({
      fetch: jest.fn(() => mockOkResponse),
      optimisticUpdatedGenerator: jest.fn(() => mockOptimisticId),
      postThunkActionFactory: postNewItemFactory
    });
    const dispatch = jest.fn();
    const getState = jest.fn();

    await postItemThunk(mockNewText)(dispatch, getState, {});

    expect(dispatch.mock.calls[0][0]).toEqual(expectedActions[0]);
    expect(dispatch.mock.calls[1][0]).toEqual(expectedActions[1]);
  });

  it(`dispatches "${POST_REQUEST_STARTED}" and "${POST_REQUEST_FAIL}" action with given text and NOK response`, async () => {
    const expectedActions = [
      {
        type: POST_REQUEST_STARTED,
        payload: {
          optimisticId: mockOptimisticId,
          text: mockNewText,
        },
      },
      {
        type: POST_REQUEST_FAIL,
        payload: {
          retryAction: mockPostThunk,
          error: new Error(`${mockNokResponse.status}: ${mockNokResponse.statusText}`),
          id: mockOptimisticId,
        }
      },
    ];
    const postItemThunk = postNewItemFactory({
      fetch: jest.fn(() => mockNokResponse),
      optimisticUpdatedGenerator: jest.fn(() => mockOptimisticId),
      postThunkActionFactory: mockPostThunkFactory
    });
    const dispatch = jest.fn();
    const getState = jest.fn();

    await postItemThunk(mockNewText)(dispatch, getState, {});

    expect(dispatch.mock.calls[0][0]).toEqual(expectedActions[0]);
    expect(dispatch.mock.calls[1][0]).toEqual(expectedActions[1]);
  });
});

