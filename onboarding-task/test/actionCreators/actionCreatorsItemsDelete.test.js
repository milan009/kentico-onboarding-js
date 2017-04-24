import {
  DELETE_ITEM_REQUEST,
  DELETE_ITEM_SUCCESS,
  DELETE_ITEM_FAILURE,
} from '../../src/actions/actionTypes.ts';
import {
  deleteItemFactory,
  deleteItemRequest,
  deleteItemSuccess,
  deleteItemFailure,
} from '../../src/actions/actionFactories/deleteActionFactory.ts';

describe('actions DELETE', () => {
  const id = '95AB19B6-455B-469C-83AA-CD505E9389BD';

  it(`should return action type ${DELETE_ITEM_REQUEST}`, () => {
    const expectedAction = {
      type: DELETE_ITEM_REQUEST,
      payload: {},
    };

    const resultAction = deleteItemRequest();

    expect(resultAction).toEqual(expectedAction);
  });

  it(`should return action ${DELETE_ITEM_SUCCESS}`, () => {
    const expectedAction = {
      type: DELETE_ITEM_SUCCESS,
      payload: {
        id,
      },
    };

    const resultAction = deleteItemSuccess(id);

    expect(resultAction).toEqual(expectedAction);
  });

  it(`should return action ${DELETE_ITEM_FAILURE}`, () => {
    const expectedAction = {
      type: DELETE_ITEM_FAILURE,
      payload: {
        errors: ['error 1', 'error 2'],
      },
    };

    const resultAction = deleteItemFailure(expectedAction.payload.errors);

    expect(resultAction).toEqual(expectedAction);
  });
});

describe('action creator DELETE', () => {
  const id = '95AB19B6-455B-469C-83AA-CD505E9389BD';
  const errors = ['error1', 'error2'];

  const dispatchMock = jest.fn((action) => action);

  beforeEach(() => {
    dispatchMock.mockClear();
  });

  it('should dispatch deleteItemRequest first', () => {
    const fetchMock = () => Promise.resolve();
    const expectedDispatch = deleteItemRequest();
    const getItems = deleteItemFactory(fetchMock, 'www.google.com');

    getItems()(dispatchMock);

    expect(dispatchMock.mock.calls[0][0]).toEqual(expectedDispatch);
  });

  it('should dispatch deleteItemSuccess', (done) => {
    const fetchMock = () => Promise.resolve({
      status: 204,
      json: () => id,
    });
    const expectedDispatch = deleteItemSuccess(id);
    const getItems = deleteItemFactory(fetchMock, 'www.google.com');

    getItems(id)(dispatchMock)
      .then(() => {
        expect(dispatchMock.mock.calls[1][0]).toEqual(expectedDispatch);
        done();
      });
  });

  it('should dispatch deleteItemFailure', (done) => {
    const fetchMock = () => Promise.reject(errors);
    const expectedDispatch = deleteItemFailure(errors);
    const getItems = deleteItemFactory(fetchMock, 'www.google.com');

    getItems()(dispatchMock)
      .then(() => {
        expect(dispatchMock.mock.calls[1][0]).toEqual(expectedDispatch);
        done();
      });
  });
});
