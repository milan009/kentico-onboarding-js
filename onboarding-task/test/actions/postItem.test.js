import { POST_ITEM_RECEIVE } from '../../src/actions/actionTypes.ts';
import { Item } from '../../src/models/Item.ts';
import { receivePostItem, postItemFactory } from '../../src/actions/postItemFactory.ts';
import { createErrorMessageFactory } from '../../src/actions/createErrorMessageFactory.ts';

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
  });

  describe('post item tests', () => {
    const responseBody = {
      id: firstTestId,
      text: 'object1',
    };
    const dispatchMock = jest.fn((action) => action);

    const fakeFetch = () => Promise.resolve(new Response(JSON.stringify(responseBody), { status: 201 }));

    beforeEach(() => {
      dispatchMock.mockReset();
    });

    const createErrorMessage = createErrorMessageFactory(() => firstTestId);

    it('should call fetch with correct url', () => {
      const fakeDispatch = (action) => action;
      const fetchMock = jest.fn(fakeFetch);
      const testPostItem = postItemFactory(fetchMock, 'www.besturl.com', createErrorMessage)();

      testPostItem(testText)(fakeDispatch);

      expect(fetchMock.mock.calls[0][0]).toEqual('www.besturl.com');
    });

    it('should dispatch receive post item', (done) => {
      const expectedDispatchAction = receivePostItem(responseBody);
      const testPostItem = postItemFactory(fakeFetch, 'www.besturl.com', createErrorMessage)();

      testPostItem(testText)(dispatchMock)
        .then(() => {
          expect(dispatchMock.mock.calls[0][0]).toEqual(expectedDispatchAction);
          done();
        });
    });

    it('should fail post item', (done) => {
      const expectedDispatchAction = createErrorMessage(new Error('Oh, something went wrong!'));
      const failFetch = () => Promise.resolve({
        json: () => Promise.reject(new Error()),
      });
      const testPostItem = postItemFactory(failFetch, 'www.besturl.com', createErrorMessage)();


      testPostItem(testText)(dispatchMock)
        .then(() => {
          expect(dispatchMock.mock.calls[0][0]).toEqual(expectedDispatchAction);
          done();
        });
    });
  });
});


