import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import 'isomorphic-fetch';

import {
  postNewItemFactory,
  PostThunkActionFactory
} from '../../../src/actions/thunkFactories/postThunkFactory';
import {
  POST_REQUEST_STARTED,
  POST_REQUEST_FAIL,
  POST_REQUEST_SUCCESS
} from '../../../src/actions/actionTypes';
import { ThunkAction } from '../../../src/interfaces/IAction';

describe('Post thunk factory', () => {
  const middleware = [thunk];
  const mockStore = configureMockStore(middleware);

  const mockNewText = 'Blop';
  const mockOptimisticId = '17';
  const mockBackendId = '71';

  const mockOptimisticIdGenerator = () => mockOptimisticId;
  const mockFetchFactory = (response: Response) => (_: never, __: never) => Promise.resolve(response);

  const mockPostThunk: ThunkAction = (_: never) => Promise.resolve({
    type: POST_REQUEST_STARTED, payload: {
      text: mockNewText,
      optimisticId: mockOptimisticId,
    }
  });
  const mockPostThunkFactory: PostThunkActionFactory = (_: never) =>
    (___: never) => mockPostThunk;

  const mockOkResponse = new Response(JSON.stringify({id: mockBackendId, text: mockNewText}), {status: 200});
  const mockNokResponse = new Response(null, {status: 500});

  it(`dispatches "${POST_REQUEST_STARTED}" and "${POST_REQUEST_SUCCESS}" action with given text and OK response`, () => {
    const store = mockStore({});

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
      fetch: mockFetchFactory(mockOkResponse),
      optimisticUpdatedGenerator: mockOptimisticIdGenerator,
      postThunkActionFactory: postNewItemFactory});
    const resultingPromise = store.dispatch(postItemThunk(mockNewText));

    return resultingPromise.then(() => expect(store.getActions()).toEqual(expectedActions));
  });

  it(`dispatches "${POST_REQUEST_STARTED}" and "${POST_REQUEST_FAIL}" action with given text and NOK response`, () => {
    const store = mockStore({});
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
      fetch: mockFetchFactory(mockNokResponse),
      optimisticUpdatedGenerator: mockOptimisticIdGenerator,
      postThunkActionFactory: mockPostThunkFactory
    });
    const resultingPromise = store.dispatch(postItemThunk(mockNewText));

    return resultingPromise.then(() => expect(store.getActions()).toEqual(expectedActions));
  });
});

