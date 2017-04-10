import { requestItems, receiveItems, fetchItemsFactory, failFetchItemsFactory } from '../../src/actions/fetchItemsFactory.ts';
import { FETCH_ITEMS_REQUEST, FETCH_ITEMS_RECEIVE } from '../../src/actions/actionTypes.ts';

describe('fetchItems', () => {
  const firstTestId = '0aeeaa2b-1a2a-482c-b2a6-b172109071e7';
  const secondTestId = '70e9ad48-e190-4578-8939-f9afa5b51501';
  const responseBody = [
    {
      id: firstTestId,
      text: 'object1',
    },
    {
      id: secondTestId,
      text: 'object2',
    },
  ];

  describe('action creators test', () => {
    it('should return request items action', () => {
      const expectedAction = { type: FETCH_ITEMS_REQUEST, payload: {} };

      const resultAction = requestItems();

      expect(resultAction).toEqual(expectedAction);
    });

    it('should return receive items action', () => {
      const expectedAction = {
        type: FETCH_ITEMS_RECEIVE,
        payload: {
          items: [
            {
              id: firstTestId,
              text: 'object1',
            },
            {
              id: secondTestId,
              text: 'object2',
            },
          ],
        },
      };

      const resultAction = receiveItems(responseBody);

      expect(resultAction).toEqual(expectedAction);
    });
  });


  describe('fetch items tests', () => {
    const dispatchMock = jest.fn((action) => action);

    const failFetchItems = failFetchItemsFactory(() => firstTestId);


    const fakeFetch = () => Promise.resolve({
      json: () => Promise.resolve(responseBody),
    });

    beforeEach(() => {
      dispatchMock.mockReset();
    });


    it('should dispatch requestItems', () => {
      const fakeDispatch = jest.fn((action) => action);
      const expectedDispatchAction = requestItems();
      const testFetchItems = fetchItemsFactory(fakeFetch, 'www.besturl.com', failFetchItems);

      testFetchItems(fakeDispatch);

      expect(fakeDispatch.mock.calls[0][0]).toEqual(expectedDispatchAction);
    });

    it('should call fetch with correct url', () => {
      const fakeDispatch = (action) => action;
      const fetchMock = jest.fn(fakeFetch);
      const testFetchItems = fetchItemsFactory(fetchMock, 'www.besturl.com', failFetchItems);

      testFetchItems(fakeDispatch);

      expect(fetchMock.mock.calls[0][0]).toEqual('www.besturl.com');
    });

    it('should dispatch receive items', (done) => {
      const expectedDispatchAction = receiveItems(responseBody);
      const testFetchItems = fetchItemsFactory(fakeFetch, 'www.besturl.com', failFetchItems);

      testFetchItems(dispatchMock)
        .then(() => {
          expect(dispatchMock.mock.calls[1][0]).toEqual(expectedDispatchAction);
          done();
        });
    });

    it('should dispatch failFetchItems', (done) => {
      const expectedDispatchAction = failFetchItems(new Error('Oh, something went wrong!'));
      const failFetch = () => Promise.resolve({
        json: () => Promise.reject(new Error()),
      });
      const testFetchItems = fetchItemsFactory(failFetch, 'www.besturl.com', failFetchItems);


      testFetchItems(dispatchMock)
        .then(() => {
          expect(dispatchMock.mock.calls[1][0]).toEqual(expectedDispatchAction);
          done();
        });
    });
  });
});

