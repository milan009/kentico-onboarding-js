import { postItemSuccess, postItemFailure } from '../../src/actions/actionCreators.ts';
import { postItemFactory } from '../../src/actions/actionDependencies/postItemFactory.ts';

const json = [
  {
    id: undefined,
    text: 'first item'
  },
];

describe('post item action creator', () => {
  const postMock = (url, data) => Promise.resolve({json: () => Promise.resolve(json)});
  const fetchPostFailed = (url, data) => Promise.reject(new Error('error in test'));
  const dispatchMock = jest.fn((action) => action);
  beforeEach( () => { dispatchMock.mockReset(); });

  it('dispatches POST_ITEM_SUCCESS action', (done) => {
    const expectedAction = postItemSuccess(json);
    const postItem = postItemFactory(postMock);
    const thunkAction = postItem();

    thunkAction(dispatchMock).then( () => {
      const actualActionDispatched = dispatchMock.mock.calls[0][0];
      expect(actualActionDispatched).toEqual(expectedAction);
      done();
    });
  });

  it('dispatches POST_ITEM_FAILURE action', () => {
    const expectedAction = postItemFailure(new Error('error in test'));
    const postItem = postItemFactory(fetchPostFailed);
    const thunkAction = postItem();

    thunkAction(dispatchMock).then( (done) => {
      const actualActionDispatched = dispatchMock.mock.calls[0][0];
      expect(actualActionDispatched).toEqual(expectedAction);
      done();
    });

  });

});

