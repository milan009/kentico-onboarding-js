import { fetchItemsFailure, fetchItemsRequest, fetchItemsSuccess } from '../../src/actions/actionCreators.ts';
import { fetchItemsFactory } from '../../src/actions/actionDependencies/fetchItemsFactory.ts';

describe('fetch items action creator', () => {
  const fakeApiResponse = [
    {
      id: '12345',
      text: 'first item'
    },
    {
      id: '67890',
      text: 'second item'
    },
  ];

  const fetchMock = (url) => Promise.resolve({json: () => Promise.resolve(fakeApiResponse)});
  const fetchFailedMock =  (url) => Promise.reject("error in test");
  const dispatchMock = jest.fn((action) => action);

  beforeEach( () => { dispatchMock.mockReset(); });

  it('dispatches FETCH_ITEMS_REQUEST action', () => {
    const expectedAction = fetchItemsRequest();
    const fetchItems = fetchItemsFactory(fetchMock);
    const thunkAction = fetchItems();

    thunkAction(dispatchMock);
    const actualActionDispatched = dispatchMock.mock.calls[0][0];

    expect(actualActionDispatched).toEqual(expectedAction);
  });

  it('dispatches FETCH_ITEMS_SUCCESS action', (done) => {

    const expectedAction = fetchItemsSuccess(fakeApiResponse);
    const fetchItems = fetchItemsFactory(fetchMock);
    const thunkAction = fetchItems();

    thunkAction(dispatchMock).then(() => {
      const actualActionDispatched = dispatchMock.mock.calls[1][0];

      expect(actualActionDispatched).toEqual(expectedAction);
      done();
    });
  });

  it('dispatches FETCH_ITEMS_FAILURE action', (done) => {
    const expectedAction = fetchItemsFailure('error in test');
    const fetchItems = fetchItemsFactory(fetchFailedMock);
    const thunkAction = fetchItems();

    thunkAction(dispatchMock).then(() => {
      const actualActionDispatched = dispatchMock.mock.calls[1][0];

      expect(actualActionDispatched).toEqual(expectedAction);
      done();
    });
  });

  it('calls right url', () => {
    const expectedUrl = '/api/v1/items';
    const jestFetchMock = jest.fn(fetchMock);
    const fetchItems = fetchItemsFactory(jestFetchMock);
    const thunkAction = fetchItems();
    thunkAction(dispatchMock);
    const actualUrl = jestFetchMock.mock.calls[0][0];

    expect(actualUrl).toEqual(expectedUrl);
  });
});
