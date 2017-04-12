import { postItemSuccess, postItemFailure } from '../../src/actions/actionCreators.ts';
import { postItemFactory } from '../../src/actions/actionDependencies/postItemFactory.ts';

const newItem = {
  id: '00000000-0000-0000-0000-000000000000',
  text: 'first item'
};

describe('post item action creator', () => {
  const postMock = (url, data) => Promise.resolve(new Response(JSON.stringify(newItem), { status: 201 }));
  const fetchPostFailed = (url, data) => Promise.resolve({
    json: () => Promise.reject(new Error('Error in test')),
  });
  const dispatchMock = jest.fn((action) => action);
  beforeEach( () => { dispatchMock.mockReset(); });

  it('dispatches POST_ITEM_SUCCESS action', (done) => {
    const expectedAction = postItemSuccess(newItem);
    const postItem = postItemFactory(postMock);
    const thunkAction = postItem();

    thunkAction(dispatchMock).then( () => {
      const actualActionDispatched = dispatchMock.mock.calls[0][0];
      expect(actualActionDispatched).toEqual(expectedAction);
      done();
    });
  });

  it('dispatches POST_ITEM_FAILURE action', () => {
    const expectedAction = postItemFailure(new Error('Error in test'));
    const postItem = postItemFactory(fetchPostFailed);
    const thunkAction = postItem();

    thunkAction(dispatchMock).then( (done) => {
      const actualActionDispatched = dispatchMock.mock.calls[0][0];
      expect(actualActionDispatched).toEqual(expectedAction);
      done();
    });

  });

});

