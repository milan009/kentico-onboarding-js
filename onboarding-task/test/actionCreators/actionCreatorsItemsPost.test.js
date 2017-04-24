import {
  POST_ITEM_REQUEST,
  POST_ITEM_SUCCESS,
  POST_ITEM_FAILURE,
} from '../../src/actions/actionTypes.ts';
import {
  postItemFactory,
  postItemRequest,
  postItemSuccess,
  postItemFailure,
} from '../../src/actions/actionFactories/postActionFactory.ts';

describe('actions POST', () => {
  const id1 = '95AB19B6-455B-469C-83AA-CD505E9389BD';
  const response = {
    id: id1,
    text: 'text 1',
  };

  it(`should return action type ${POST_ITEM_REQUEST}`, () => {
    const expectedAction = {
      type: POST_ITEM_REQUEST,
      payload: {},
    };

    const resultAction = postItemRequest();

    expect(resultAction).toEqual(expectedAction);
  });

  it(`should return action ${POST_ITEM_SUCCESS}`, () => {
    const expectedAction = {
      type: POST_ITEM_SUCCESS,
      payload: {
        item: response,
      },
    };

    const resultAction = postItemSuccess(response);

    expect(resultAction).toEqual(expectedAction);
  });

  it(`should return action ${POST_ITEM_FAILURE}`, () => {
    const expectedAction = {
      type: POST_ITEM_FAILURE,
      payload: {
        errors: ['error 1', 'error 2'],
      },
    };

    const resultAction = postItemFailure(expectedAction.payload.errors);

    expect(resultAction).toEqual(expectedAction);
  });
});

describe('action creator POST', () => {
  const id1 = '95AB19B6-455B-469C-83AA-CD505E9389BD';
  const response = {
    id: id1,
    text: 'text 1',
  };
  const errors = ['error1', 'error2'];

  const dispatchMock = jest.fn((action) => action);

  beforeEach(() => {
    dispatchMock.mockClear();
  });

  it('should dispatch postItemRequest first', () => {
    const fetchMock = () => Promise.resolve();
    const expectedDispatch = postItemRequest();
    const getItems = postItemFactory(fetchMock, 'www.google.com');

    getItems()(dispatchMock);

    expect(dispatchMock.mock.calls[0][0]).toEqual(expectedDispatch);
  });

  it('should dispatch postItemSuccess', (done) => {
    const fetchMock = () => Promise.resolve({
      status: 201,
      json: () => response,
    });
    const expectedDispatch = postItemSuccess(response);
    const getItems = postItemFactory(fetchMock, 'www.google.com');

    getItems(response.text)(dispatchMock)
      .then(() => {
        expect(dispatchMock.mock.calls[1][0]).toEqual(expectedDispatch);
        done();
      });
  });

  it('should dispatch postItemFailure', (done) => {
    const fetchMock = () => Promise.reject(errors);
    const expectedDispatch = postItemFailure(errors);
    const getItems = postItemFactory(fetchMock, 'www.google.com');

    getItems()(dispatchMock)
      .then(() => {
        expect(dispatchMock.mock.calls[1][0]).toEqual(expectedDispatch);
        done();
      });
  });
});
