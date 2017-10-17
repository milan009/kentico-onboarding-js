import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import 'isomorphic-fetch';

import {
  putSavedItemFactory,
  PutThunkActionFactory
} from '../../../src/actions/thunkFactories/putThunkFactory';
import {
  PUT_REQUEST_STARTED,
  PUT_REQUEST_FAIL,
  PUT_REQUEST_SUCCESS, POST_REQUEST_STARTED
} from '../../../src/actions/actionTypes';
import { ItemData } from '../../../src/models/ItemData';
import { ThunkAction } from '../../../src/interfaces/IAction';

describe('Put thunk factory', () => {
  const middleware = [thunk];
  const mockStore = configureMockStore(middleware);

  const mockItem = new ItemData({id: '17', text: 'Popcorn bucket'});
  const mockOkResponse = new Response(JSON.stringify(mockItem), {status: 200});
  const mockNokResponse = new Response(null, {status: 500});

  const mockFetchFactory = (response: Response) => (_: any, __: ResponseInit) => Promise.resolve(response);

  const mockPutThunk: ThunkAction = (_: never) => Promise.resolve({
    type: POST_REQUEST_STARTED, payload: {
      item: mockItem,
      id: mockItem.id,
    }
  });

  const mockPutThunkFactory: PutThunkActionFactory = (_: never) =>
    (___: never) => mockPutThunk;

  it(`dispatches "${PUT_REQUEST_STARTED}" and "${PUT_REQUEST_SUCCESS}" action with given item and OK response`, () => {
    const store = mockStore({});
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
      fetch: mockFetchFactory(mockOkResponse),
      putThunkActionFactory: putSavedItemFactory,
    });
    const resultingPromise = store.dispatch(putSavedItemThunk(mockItem));

    return resultingPromise.then(() => expect(store.getActions()).toEqual(expectedActions));
  });

  it(`dispatches "${PUT_REQUEST_STARTED}" and "${PUT_REQUEST_FAIL}" action with given item and NOK response`, () => {
    const store = mockStore({});
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
          retryAction : mockPutThunk,
        },
      },
    ];

    const putSavedItemThunk = putSavedItemFactory({
      fetch: mockFetchFactory(mockNokResponse),
      putThunkActionFactory: mockPutThunkFactory,
    });
    const resultingPromise = store.dispatch(putSavedItemThunk(mockItem));

    return resultingPromise.then(() => expect(store.getActions()).toEqual(expectedActions));
  });
});
