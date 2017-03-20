import { sendItemSuccess, sendItemFailure } from '../../src/actionCreators/sendItemActionCreators.ts';
import { SEND_ITEM_SUCCESS, SEND_ITEM_FAILURE } from '../../src/constants/actionTypes.ts';

describe('sendItemActionCreators ', () => {
  const fakeResponse = 'This is fake response.';

  it(`returns action with response in payload and type ${SEND_ITEM_SUCCESS}`, () => {
    const expectedAction = {
      type: SEND_ITEM_SUCCESS,
      payload: {
        response: fakeResponse,
      },
    };
    const actualAction = sendItemSuccess(fakeResponse);

    expect(actualAction).toEqual(expectedAction);
  });

  it(`returns action with response in payload and type ${SEND_ITEM_FAILURE}`, () => {
    const expectedAction = {
      type: SEND_ITEM_FAILURE,
      payload: {
        response: fakeResponse,
      },
    };
    const actualAction = sendItemFailure(fakeResponse);

    expect(actualAction).toEqual(expectedAction);
  });
});

describe('sendItem ', () => {
  const fakeSuccessResponse = [{ Id: 'id', Value: 'text' }];
  const successMessage = `Item ${fakeSuccessResponse.Value} was successfully uploaded.`;
  const fakeFetch = (path) => {
    return path === '/api/Items'
      ? Promise.resolve({ json: () => Promise.resolve(fakeSuccessResponse), ok: true })
      : Promise.reject();
  };
  const sendItemActionCreator = sendItemFactory(fakeFetch);

  it('calls fetchParam with correct path', (done) => {
    const mockDispatch = action => action;
    sendItemActionCreator()(mockDispatch).then(() => done());
  });

  it('dispatches fetchItemsSuccess with parsed response as argument when fetchParam returns Promise that resolves', (done) => {
    const mockDispatch = jest.fn(action => action);
    sendItemActionCreator()(mockDispatch).then(() => {
      const actualDispatchedAction = mockDispatch.mock.calls[0][0];

      expect(actualDispatchedAction).toEqual(sendItemSuccess(successMessage));
      done();
    });
  });

  it('dispatches fetchItemsFailure with error message from the server as argument when fetchParam returns Promise that rejects', (done) => {
    const mockDispatch = jest.fn(action => action);
    const errorMessage = 'error Test';
    const fakeFetchWithError = () => {
      return Promise.resolve({ statusText: errorMessage, ok: false });
    };
    const fetchItemsActionCreatorWithError = sendItemFactory(fakeFetchWithError);
    fetchItemsActionCreatorWithError()(mockDispatch).then(() => {
      const actualDispatchedAction = mockDispatch.mock.calls[0][0];

      expect(actualDispatchedAction).toEqual(sendItemFailure(errorMessage));
      done();
    });
  });
});
