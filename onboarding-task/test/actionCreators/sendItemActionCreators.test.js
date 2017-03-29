import { sendItemSuccess, sendItemFailure } from '../../src/actionCreators/sendItemActionCreators.ts';
import { SEND_ITEM_SUCCESS, SEND_ITEM_FAILURE } from '../../src/constants/actionTypes.ts';
import { sendItemFactory } from '../../src/actionCreators/sendItemFactory.ts';

describe('sendItemActionCreators ', () => {
  const fakeResponse = 'This is fake response.';
  const moreAccurateResponse = { Id: 'id', Value: 'text' };

  it(`returns action with correct response in payload and type ${SEND_ITEM_SUCCESS}`, () => {
    const expectedAction = {
      type: SEND_ITEM_SUCCESS,
      payload: {
        successMessage: `Item ${moreAccurateResponse.Value} was successfully uploaded.`,
      },
    };
    const actualAction = sendItemSuccess(moreAccurateResponse);

    expect(actualAction).toEqual(expectedAction);
  });

  it(`returns action with response in payload and type ${SEND_ITEM_FAILURE}`, () => {
    const expectedAction = {
      type: SEND_ITEM_FAILURE,
      payload: {
        errorMessage: fakeResponse,
      },
    };
    const actualAction = sendItemFailure(fakeResponse);

    expect(actualAction).toEqual(expectedAction);
  });
});

describe('sendItem ', () => {
  const fakeSuccessResponse = { Id: 'id', Value: 'text' };
  const fakeFetch = (path) => {
    return path === '/api/v1/Items'
      ? Promise.resolve({ json: () => Promise.resolve(fakeSuccessResponse), ok: true })
      : Promise.reject();
  };
  const sendItemActionCreator = sendItemFactory(fakeFetch);

  it('calls fetchParam with correct path', (done) => {
    const mockDispatch = action => action;
    sendItemActionCreator(fakeSuccessResponse)(mockDispatch).then(() => done());
  });

  it('dispatches sendItemSuccess with parsed response as argument when response.ok', (done) => {
    const mockDispatch = jest.fn(action => action);
    sendItemActionCreator(fakeSuccessResponse)(mockDispatch).then(() => {
      const actualDispatchedAction = mockDispatch.mock.calls[0][0];

      expect(actualDispatchedAction).toEqual(sendItemSuccess(fakeSuccessResponse));
      done();
    });
  });

  it('dispatches sendItemFailure with error message from the server as argument when !response.ok', (done) => {
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
