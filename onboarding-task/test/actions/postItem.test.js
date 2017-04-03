import { POST_ITEM_RECEIVE, POST_ITEM_FAIL } from '../../src/actions/actionTypes.ts';
import { Item } from '../../src/models/Item.ts';
import { receivePostItem, failPostItem, postItemFactory } from '../../src/actions/postItemFactory.ts';

describe('postItem', () => {
  const firstTestId = '0aeeaa2b-1a2a-482c-b2a6-b172109071e7';
  const testText = 'test text';
  const testItem = new Item({ id: '00000000-0000-0000-0000-000000000000', text: testText });

  describe('postItem action creators', () => {
    it('should create post receive action', () => {
      const expectedAction = {
        type: POST_ITEM_RECEIVE,
        payload: {
          item: testItem,
        },
      };

      const resultAction = receivePostItem(testItem);

      expect(resultAction).toEqual(expectedAction);
    });

    it('should create post fail action', () => {
      const expectedAction = {
        type: POST_ITEM_FAIL,
        payload: {
          error: new Error('fail'),
        },
      };

      const resultAction = failPostItem(new Error('fail'));

      expect(resultAction).toEqual(expectedAction);
    });
  });

  describe('post item tests', () => {
    const responseBody = {
      id: firstTestId,
      text: 'object1',
    };
    const dispatchMock = jest.fn((action) => action);

    const fakeFetch = () => Promise.resolve({
      json: () => Promise.resolve(responseBody),
    });

    beforeEach(() => {
      dispatchMock.mockReset();
    });

    it('should call fetch with correct url', () => {
      const fetchMock = jest.fn(fakeFetch);
      const testPostItem = postItemFactory(fetchMock, 'www.besturl.com');

      testPostItem(testText)(dispatchMock);

      expect(fetchMock.mock.calls[0][0]).toEqual('www.besturl.com');
    });

    it('should dispatch receive post item', (done) => {
      const expectedDispatchAction = receivePostItem(responseBody);
      const testPostItem = postItemFactory(fakeFetch, 'www.besturl.com');

      testPostItem(testText)(dispatchMock)
        .then(() => {
          expect(dispatchMock.mock.calls[1][0]).toEqual(expectedDispatchAction);
          done();
        })
        .catch((e) => {
          console.log(e);
        });
    });

    it('should fail post item', (done) => {
      const expectedDispatchAction = failPostItem(new Error());
      const failFetch = () => Promise.resolve({
        json: () => Promise.reject(new Error()),
      });
      const testPostItem = postItemFactory(failFetch, 'www.besturl.com');


      testPostItem(testText)(dispatchMock)
        .then(() => {
          expect(dispatchMock.mock.calls[0][0]).toEqual(expectedDispatchAction);
          done();
        })
        .catch((e) => {
          console.log(e);
        });
    });
  });
});


