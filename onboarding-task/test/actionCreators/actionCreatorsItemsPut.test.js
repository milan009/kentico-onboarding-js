import {
  PUT_ITEM_REQUEST,
  PUT_ITEM_SUCCESS,
  PUT_ITEM_FAILURE,
} from '../../src/actions/actionTypes.ts';
import {
  putItemFactory,
  putItemRequest,
  putItemSuccess,
  putItemFailure,
} from '../../src/actions/actionFactories/putActionFactory.ts';

describe('actions POST', () => {
  const id = '95AB19B6-455B-469C-83AA-CD505E9389BD';
  const response = {
    id,
    text: 'text 1',
  };

  it(`should return action type ${PUT_ITEM_REQUEST}`, () => {
    const expectedAction = {
      type: PUT_ITEM_REQUEST,
      payload: {},
    };

    const resultAction = putItemRequest();

    expect(resultAction).toEqual(expectedAction);
  });

  it(`should return action ${PUT_ITEM_SUCCESS}`, () => {
    const expectedAction = {
      type: PUT_ITEM_SUCCESS,
      payload: {
        item: response,
      },
    };

    const resultAction = putItemSuccess(response);

    expect(resultAction).toEqual(expectedAction);
  });

  it(`should return action ${PUT_ITEM_FAILURE}`, () => {
    const expectedAction = {
      type: PUT_ITEM_FAILURE,
      payload: {
        errors: ['error 1', 'error 2'],
      },
    };

    const resultAction = putItemFailure(expectedAction.payload.errors);

    expect(resultAction).toEqual(expectedAction);
  });
});

describe('action creator POST', () => {
  const id = '95AB19B6-455B-469C-83AA-CD505E9389BD';
  const response = {
    id,
    text: 'text 1',
  };
  const errors = ['error1', 'error2'];

  it('should dispatch putItemRequest first', () => {
    const dispatchMock = jest.fn((action) => action);
    const fetchMock = () => Promise.resolve();
    const expectedDispatch = putItemRequest();
    const getItems = putItemFactory(fetchMock, 'www.google.com');

    getItems()(dispatchMock);

    expect(dispatchMock.mock.calls[0][0]).toEqual(expectedDispatch);
  });

  it('should dispatch putItemSuccess', (done) => {
    const dispatchMock = jest.fn((action) => action);
    const fetchMock = () => Promise.resolve({
      status: 200,
      json: () => response,
    });
    const expectedDispatch = putItemSuccess(response);
    const putItem = putItemFactory(fetchMock, 'www.google.com');

    putItem(response.id, response.text)(dispatchMock)
      .then(() => {
        expect(dispatchMock.mock.calls[1][0]).toEqual(expectedDispatch);
        done();
      });
  });

  it('should dispatch putItemFailure', (done) => {
    const dispatchMock = jest.fn((action) => action);
    const fetchMock = () => Promise.reject(errors);
    const expectedDispatch = putItemFailure(errors);
    const getItems = putItemFactory(fetchMock, 'www.google.com');

    getItems()(dispatchMock)
      .then(() => {
        expect(dispatchMock.mock.calls[1][0]).toEqual(expectedDispatch);
        done();
      });
  });
});
