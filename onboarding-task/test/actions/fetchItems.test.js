import { fetchItemsFailure, fetchItemsRequest, fetchItemsSuccess } from '../../src/actions/actionCreators.ts';
import { fetchItemsFactory } from '../../src/actions/actionDependencies/fetchItemsFactory.ts';

describe('fetch items action creator', () => {
  const fakeApiResponse = [
    {
      id: '12345',
      text: 'first item',
    },
    {
      id: '67890',
      text: 'second item',
    },
  ];

  const fetchMock = () => Promise.resolve(new Response(JSON.stringify(fakeApiResponse), { status: 200 }));
  const fetchFailedMock = () => Promise.resolve({ ok: false, statusText: 'Error in test', });
  const dispatchMock = (action) => action;

  it('dispatches FETCH_ITEMS_REQUEST action', () => {
    const dispatchSpy = jest.fn(dispatchMock);
    const expectedAction = fetchItemsRequest();
    const fetchItems = fetchItemsFactory(fetchMock);
    const thunkAction = fetchItems();

    thunkAction(dispatchSpy);
    const actualActionDispatched = dispatchSpy.mock.calls[0][0];

    expect(actualActionDispatched).toEqual(expectedAction);
  });

  it('dispatches FETCH_ITEMS_SUCCESS action', () => {
    const dispatchSpy = jest.fn(dispatchMock);
    const expectedAction = fetchItemsSuccess(fakeApiResponse);
    const fetchItems = fetchItemsFactory(fetchMock);
    const thunkAction = fetchItems();

    thunkAction(dispatchSpy).then(() => {
      const actualActionDispatched = dispatchSpy.mock.calls[1][0];

      expect(actualActionDispatched).toEqual(expectedAction);
    });
  });

  it('dispatches FETCH_ITEMS_FAILURE action', (done) => {
    const dispatchSpy = jest.fn(dispatchMock);
    const expectedAction = fetchItemsFailure(new Error('Error in test'));
    const fetchItems = fetchItemsFactory(fetchFailedMock);
    const thunkAction = fetchItems();

    thunkAction(dispatchSpy).then(() => {
      const actualActionDispatched = dispatchSpy.mock.calls[1][0];
      expect(actualActionDispatched).toEqual(expectedAction);
      done();
    });
  });

  it('calls right url', () => {
    const dispatchSpy = jest.fn(dispatchMock);
    const expectedUrl = '/api/v1/items';
    const jestFetchMock = jest.fn(fetchMock);
    const fetchItems = fetchItemsFactory(jestFetchMock);
    const thunkAction = fetchItems();
    thunkAction(dispatchSpy);
    const actualUrl = jestFetchMock.mock.calls[0][0];

    expect(actualUrl).toEqual(expectedUrl);
  });
});
