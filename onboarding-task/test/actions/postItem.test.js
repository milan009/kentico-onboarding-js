import { postItemSuccess, postItemFailure } from '../../src/actions/actionCreators.ts';
import { postItemFactory } from '../../src/actions/actionDependencies/postItemFactory.ts';

const newItem = {
  id: '00000000-0000-0000-0000-000000000000',
  text: 'first item',
};

describe('post item action creator', () => {
  const postMock = () => Promise.resolve(new Response(JSON.stringify(newItem), { status: 201 }));
  const fetchPostFailed = () => Promise.resolve({ ok: false, statusText: 'Error in test' });
  const dispatchMock = (action) => action;

  it('dispatches POST_ITEM_SUCCESS action', (done) => {
    const dispatchSpy = jest.fn(dispatchMock);
    const expectedAction = postItemSuccess(newItem);
    const postItem = postItemFactory(postMock);
    const thunkAction = postItem();

    thunkAction(dispatchSpy).then(() => {
      const actualActionDispatched = dispatchSpy.mock.calls[0][0];
      expect(actualActionDispatched).toEqual(expectedAction);
      done();
    });
  });

  it('dispatches POST_ITEM_FAILURE action', (done) => {
    const dispatchSpy = jest.fn(dispatchMock);
    const expectedAction = postItemFailure(new Error('Error in test'));
    const postItem = postItemFactory(fetchPostFailed);
    const thunkAction = postItem();

    thunkAction(dispatchSpy).then(() => {
      const actualActionDispatched = dispatchSpy.mock.calls[0][0];
      expect(actualActionDispatched).toEqual(expectedAction);
      done();
    });
  });
});
