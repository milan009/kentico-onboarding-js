import { sendItemSuccess, sendItemFailure } from '../../src/actionCreators/sendItemActionCreators.ts';
import { SEND_ITEM_SUCCESS, SEND_ITEM_FAILURE } from '../../src/constants/actionTypes.ts';
import { sendItemFactory } from '../../src/actionCreators/sendItemFactory.ts';

describe('sendItemActionCreators ', () => {
  const fakeFailureResponse = 'This is fake response.';
  const fakeSuccessResponse = { id: 'id', value: 'text', ueid: 'ueid' };

  it(`returns action with correct response in payload and type ${SEND_ITEM_SUCCESS}`, () => {
    const expectedAction = {
      type: SEND_ITEM_SUCCESS,
      payload: {
        successMessage: `Item ${fakeSuccessResponse.value} was successfully uploaded.`,
        item: fakeSuccessResponse,
      },
    };
    const actualAction = sendItemSuccess(fakeSuccessResponse);

    expect(actualAction).toEqual(expectedAction);
  });

  it(`returns action with response in payload and type ${SEND_ITEM_FAILURE}`, () => {
    const expectedAction = {
      type: SEND_ITEM_FAILURE,
      payload: {
        errorMessage: fakeFailureResponse,
        itemId: 'testUeid',
      },
    };
    const actualAction = sendItemFailure(fakeFailureResponse, 'testUeid');

    expect(actualAction).toEqual(expectedAction);
  });
});

describe('sendItem ', () => {
  const fakeDispatch = action => action;
  const fakeSuccessResponse = { id: 'id', value: 'text', ueid: 'ueid' };
  const fakeFetch = (path, params) => {
    return path === '/api/v1/Items'
      ? Promise.resolve({ json: () => Promise.resolve(fakeSuccessResponse), ok: true })
      : Promise.reject();
  };
  const sendItemActionCreator = sendItemFactory(fakeFetch);

  it('calls fetchParam with correct path', (done) => {
    sendItemActionCreator(fakeSuccessResponse)(fakeDispatch).then(() => done());
  });

  it('calls fetchParam with correct parameters', (done) => {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    const fetchParams = { method: 'POST', body: JSON.stringify(fakeSuccessResponse), headers: myHeaders };
    const fakeFetchWithSpy = jest.fn((path) => {
      return path === '/api/v1/Items'
        ? Promise.resolve({ json: () => Promise.resolve(fakeSuccessResponse), ok: true })
        : Promise.reject();
    });
    sendItemFactory(fakeFetchWithSpy)(fakeSuccessResponse)(fakeDispatch).then(() => {
      expect(fakeFetchWithSpy.mock.calls[0][1]).toEqual(fetchParams);
      done();
    });
  });

  it('dispatches sendItemSuccess with parsed response as argument when response.ok', (done) => {
    const mockDispatch = jest.fn((action) => action);
    sendItemActionCreator(fakeSuccessResponse)(mockDispatch).then(() => {
      const actualDispatchedAction = mockDispatch.mock.calls[0][0];

      expect(actualDispatchedAction).toEqual(sendItemSuccess(fakeSuccessResponse));
      done();
    });
  });

  it('dispatches sendItemFailure with error message from the server as argument when !response.ok', (done) => {
    const mockDispatch = jest.fn((action) => action);
    const errorMessage = 'error Test';
    const fakeFetchWithError = () => {
      return Promise.resolve({ statusText: errorMessage, ok: false });
    };
    const fetchItemsActionCreatorWithError = sendItemFactory(fakeFetchWithError);
    fetchItemsActionCreatorWithError({ ueid: 'ueid-test' })(mockDispatch).then(() => {
      const actualDispatchedAction = mockDispatch.mock.calls[0][0];

      expect(actualDispatchedAction).toEqual(sendItemFailure(errorMessage, 'ueid-test'));
      done();
    });
  });
});
