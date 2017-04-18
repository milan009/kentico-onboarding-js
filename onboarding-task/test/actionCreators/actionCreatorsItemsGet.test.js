import {
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_FAILURE,
} from '../../src/actions/actionTypes.ts';
import {
  getItemsFactory,
  getItemsRequest,
  getItemsSuccess,
  getItemsFailure,
} from '../../src/actions/actionFactories/actionFactoryGet.ts';

describe('actions GET', () => {
  const id1 = '95AB19B6-455B-469C-83AA-CD505E9389BD';
  const id2 = 'C026110E-7678-4FB5-9C51-B4FAA546BA1B';
  const response = [
    {
      id: id1,
      text: 'text 1',
    },
    {
      id: id2,
      text: 'text 2',
    },
  ];

  it(`should return action type ${GET_ITEMS_REQUEST}`, () => {
    const expectedAction = {
      type: GET_ITEMS_REQUEST,
      payload: {},
    };

    const resultAction = getItemsRequest();

    expect(resultAction).toEqual(expectedAction);
  });

  it(`should return action ${GET_ITEMS_SUCCESS}`, () => {
    const expectedAction = {
      type: GET_ITEMS_SUCCESS,
      payload: {
        items: response,
      },
    };

    const resultAction = getItemsSuccess(response);

    expect(resultAction).toEqual(expectedAction);
  });

  it(`should return action ${GET_ITEMS_FAILURE}`, () => {
    const expectedAction = {
      type: GET_ITEMS_FAILURE,
      payload: {
        errors: ['error 1', 'error 2'],
      },
    };

    const resultAction = getItemsFailure(expectedAction.payload.errors);

    expect(resultAction).toEqual(expectedAction);
  });
});

describe('action creator GET', () => {
  const id1 = '95AB19B6-455B-469C-83AA-CD505E9389BD';
  const id2 = 'C026110E-7678-4FB5-9C51-B4FAA546BA1B';
  const response = [
    {
      id: id1,
      text: 'text 1',
    },
    {
      id: id2,
      text: 'text 2',
    },
  ];
  const errors = ['error1', 'error2'];

  const dispatchMock = jest.fn((action) => action);

  beforeEach(() => {
    dispatchMock.mockClear();
  });

  it('should dispatch getItemsRequest', () => {
    const fetchMock = () => Promise.resolve();
    const expectedDispatch = getItemsRequest();
    const getItems = getItemsFactory(fetchMock, 'www.google.com');

    getItems()(dispatchMock);

    expect(dispatchMock.mock.calls[0][0]).toEqual(expectedDispatch);
  });

  it('should dispatch getItemsSuccess', (done) => {
    const fetchMock = () => Promise.resolve({
      status: 200,
      json: () => response,
    });
    const expectedDispatch = getItemsSuccess(response);
    const getItems = getItemsFactory(fetchMock, 'www.google.com');

    getItems()(dispatchMock)
      .then(() => {
        expect(dispatchMock.mock.calls[1][0]).toEqual(expectedDispatch);
        done();
      });
  });

  it('should dispatch getItemsFailure', (done) => {
    const fetchMock = () => Promise.reject(errors);
    const expectedDispatch = getItemsFailure(errors);
    const getItems = getItemsFactory(fetchMock, 'www.google.com');

    getItems()(dispatchMock)
      .then(() => {
        expect(dispatchMock.mock.calls[1][0]).toEqual(expectedDispatch);
        done();
      });
  });
});
