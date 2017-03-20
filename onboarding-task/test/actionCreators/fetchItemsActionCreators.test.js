import {
  fetchItemsFailure,
  fetchItemsRequest,
  fetchItemsSuccess,
} from '../../src/actionCreators/fetchItemsActionCreators.ts';
import {
  FETCH_ITEMS_FAILURE,
  FETCH_ITEMS_REQUEST,
  FETCH_ITEMS_SUCCESS,
} from '../../src/constants/actionTypes.ts';
import { fetchItemsFactory } from '../../src/actionCreators/fetchItemsFactory.ts';

describe('fetchItemsActionCreators ', () => {
  it(`${fetchItemsRequest} returns correct ${FETCH_ITEMS_REQUEST} action`, () => {
    const expectedAction = { type: FETCH_ITEMS_REQUEST, payload: {} };
    const actualAction = fetchItemsRequest();

    expect(actualAction).toEqual(expectedAction);
  });

  it(`${fetchItemsSuccess} returns correct ${FETCH_ITEMS_SUCCESS} action with given response`, () => {
    const expectedAction = { type: FETCH_ITEMS_SUCCESS, payload: { response: 'test' } };
    const actualAction = fetchItemsSuccess('test');

    expect(actualAction).toEqual(expectedAction);
  });

  it(`${fetchItemsFailure} returns correct ${FETCH_ITEMS_FAILURE} action with given response`, () => {
    const expectedAction = { type: FETCH_ITEMS_FAILURE, payload: { response: 'test' } };
    const actualAction = fetchItemsFailure('test');

    expect(actualAction).toEqual(expectedAction);
  });
});


describe('fetchItems ', () => {
  const getAllItemsResponse = [
    {
      id: '7383243d-9230-4a6c-94ea-122e151208ca',
      text: 'text1',
    },
    {
      id: '83aa9154-2b5f-49b7-b7af-25cab7bf2159',
      text: 'text2',
    },
  ];

  const fakeFetch = (path) => {
    return path === '/api/Items'
      ? Promise.resolve({ json: () => Promise.resolve(getAllItemsResponse), ok: true })
      : Promise.reject();
  };
  const fetchItemsActionCreator = fetchItemsFactory(fakeFetch);

  it('run without failure', (done) => {
    fetchItemsActionCreator()((action) => action)
      .then(() => done());
  });

  it('dispatches fetchItemsRequest', () => {
    const mockDispatch = jest.fn((action) => action);
    fetchItemsActionCreator()(mockDispatch);
    const actualDispatchedAction = mockDispatch.mock.calls[0][0];

    expect(actualDispatchedAction).toEqual(fetchItemsRequest());
  });

  it('calls fetchParam with correct path', (done) => {
    const mockDispatch = action => action;
    fetchItemsActionCreator()(mockDispatch).then(() => done());
  });

  it('dispatches fetchItemsSuccess with parsed response as argument when response.ok', (done) => {
    const mockDispatch = jest.fn(action => action);
    fetchItemsActionCreator()(mockDispatch).then(() => {
      const actualDispatchedAction = mockDispatch.mock.calls[1][0];

      expect(actualDispatchedAction).toEqual(fetchItemsSuccess(getAllItemsResponse));
      done();
    });
  });

  it('dispatches fetchItemsFailure with error message from the server as argument when !response.ok', (done) => {
    const mockDispatch = jest.fn(action => action);
    const errorMessage = 'error Test';
    const fakeFetchWithError = () => {
      return Promise.resolve({ statusText: errorMessage, ok: false });
    };
    const fetchItemsActionCreatorWithError = fetchItemsFactory(fakeFetchWithError);
    fetchItemsActionCreatorWithError()(mockDispatch).then(() => {
      const actualDispatchedAction = mockDispatch.mock.calls[1][0];

      expect(actualDispatchedAction).toEqual(fetchItemsFailure(errorMessage));
      done();
    });
  });
});
