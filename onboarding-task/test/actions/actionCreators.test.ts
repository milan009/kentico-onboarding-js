import {
  FETCH_STARTED, FETCH_SUCCESS, FETCH_FAIL,
  ITEM_MAKE_EDITABLE, ITEM_CHANGE_CANCELLED,
  PUT_REQUEST_STARTED, PUT_REQUEST_SUCCESS, PUT_REQUEST_FAIL,
  DELETE_REQUEST_STARTED, DELETE_REQUEST_SUCCESS, DELETE_REQUEST_FAIL,
  POST_REQUEST_STARTED, POST_REQUEST_SUCCESS, POST_REQUEST_FAIL,
} from '../../src/actions/actionTypes';
import {
  // TODO: Unify names of action creators
  cancelChange, makeEditable,
  deleteFailed, deleteStarted, deleteSucceeded,
  fetchingFailed, fetchingSucceeded, startFetchingItems,
  postFailed, postStarted, postSucceeded,
  putFailed, putStarted, putSucceeded,
} from '../../src/actions/actionCreators';
import { ItemData } from '../../src/models/ItemData';
import { IAction, ThunkAction } from '../../src/interfaces/IAction';
// TODO: Add types
describe('Action creators', () => {
  const error = new Error('500: Internal server error');
  const mockRetryThunk: ThunkAction = () => Promise.reject(error);

  it(`creates "${ITEM_CHANGE_CANCELLED}" action correctly`, () => {
    const expectedAction = {
      type: ITEM_CHANGE_CANCELLED,
      payload: {
        id: '17',
      },
    };

    const createdAction = cancelChange('17');

    expect(createdAction).toEqual(expectedAction);
  });

  it(`creates "${ITEM_MAKE_EDITABLE}" action correctly`, () => {
    const expectedAction = {
      type: ITEM_MAKE_EDITABLE,
      payload: {
        id: '17',
      },
    };

    const createdAction = makeEditable('17');

    expect(createdAction).toEqual(expectedAction);
  });

  it(`creates "${FETCH_STARTED}" action correctly`, () => {
    const expectedAction = {
      type: FETCH_STARTED,
    };

    const createdAction = startFetchingItems();

    expect(createdAction).toEqual(expectedAction);
  });

  it(`creates "${FETCH_SUCCESS}" action correctly`, () => {
    const fetchResultJSON = [
      {
        id: 'caf18adc-519f-46e6-a03b-f0106165bad1',
        text: 'Mlok',
      }
    ];
    const expectedAction = {
      type: FETCH_SUCCESS,
      payload: {
        items: fetchResultJSON,
      }
    };

    const createdAction = fetchingSucceeded(fetchResultJSON);

    expect(createdAction).toEqual(expectedAction);
  });

  it(`creates "${FETCH_FAIL}" action correctly`, () => {
    const expectedAction: IAction = {
      type: FETCH_FAIL,
      payload: {
        error,
        retryAction: mockRetryThunk
      }
    };

    const createdAction = fetchingFailed(error, mockRetryThunk);

    expect(createdAction).toEqual(expectedAction);
  });

  it(`creates "${PUT_REQUEST_STARTED}" action correctly`, () => {
    const item: ItemData = new ItemData({
      id: 'caf18adc-519f-46e6-a03b-f0106165bad1',
      text: 'Mlok',
    });
    const expectedAction = {
      type: PUT_REQUEST_STARTED,
      payload: {
        id: item.id,
        item,
      }
    };

    const createdAction = putStarted(item);

    expect(createdAction).toEqual(expectedAction);
  });

  it(`creates "${PUT_REQUEST_SUCCESS}" action correctly`, () => {
    const JSONItem = {
      id: 'caf18adc-519f-46e6-a03b-f0106165bad1',
      text: 'Mlok',
    };
    const expectedAction = {
      type: PUT_REQUEST_SUCCESS,
      payload: {
        id: JSONItem.id,
        item: JSONItem,
      },
    };

    const createdAction = putSucceeded(JSONItem);

    expect(createdAction).toEqual(expectedAction);
  });

  it(`creates "${PUT_REQUEST_FAIL}" action correctly`, () => {
    const putId = 'caf18adc-519f-46e6-a03b-f0106165bad1';
    const expectedAction: IAction = {
      type: PUT_REQUEST_FAIL,
      payload: {
        id: putId,
        error,
        retryAction: mockRetryThunk
      }
    };

    const createdAction = putFailed(putId, error, mockRetryThunk);

    expect(createdAction).toEqual(expectedAction);

  });

  it(`creates "${DELETE_REQUEST_STARTED}" action correctly`, () => {
    const deleteId = 'caf18adc-519f-46e6-a03b-f0106165bad1';
    const expectedAction = {
      type: DELETE_REQUEST_STARTED,
      payload: {
        id: deleteId,
      },
    };

    const createdAction = deleteStarted(deleteId);

    expect(createdAction).toEqual(expectedAction);
  });

  it(`creates "${DELETE_REQUEST_SUCCESS}" action correctly`, () => {
    const deleteId = 'caf18adc-519f-46e6-a03b-f0106165bad1';
    const expectedAction = {
      type: DELETE_REQUEST_SUCCESS,
      payload: {
        id: deleteId,
      },
    };

    const createdAction = deleteSucceeded(deleteId);

    expect(createdAction).toEqual(expectedAction);
  });

  it(`creates "${DELETE_REQUEST_FAIL}" action correctly`, () => {
    const deleteId = 'caf18adc-519f-46e6-a03b-f0106165bad1';
    const expectedAction: IAction = {
      type: DELETE_REQUEST_FAIL,
      payload: {
        id: deleteId,
        error,
        retryAction: mockRetryThunk
      }
    };

    const createdAction = deleteFailed(deleteId, error, mockRetryThunk);

    expect(createdAction).toEqual(expectedAction);
  });

  it(`creates "${POST_REQUEST_STARTED}" action correctly`, () => {
    const postOptimisticId = 'caf18adc-519f-46e6-a03b-f0106165bad1';
    const textToPost = 'Mlok';
    const expectedAction = {
      type: POST_REQUEST_STARTED,
      payload: {
        text: textToPost,
        optimisticId: postOptimisticId,
      },
    };

    const createdAction = postStarted(postOptimisticId, textToPost);

    expect(createdAction).toEqual(expectedAction);
  });

  it(`creates "${POST_REQUEST_SUCCESS}" action correctly`, () => {
    const formerId = '00000000-aaaa-aaaa-aaaa-000000000000';
    const JSONItem = {
      id: 'caf18adc-519f-46e6-a03b-f0106165bad1',
      text: 'Mlok',
    };

    const expectedAction = {
      type: POST_REQUEST_SUCCESS,
      payload: {
        formerId,
        item: JSONItem,
      },
    };

    const createdAction = postSucceeded(formerId, JSONItem);

    expect(createdAction).toEqual(expectedAction);
  });

  it(`creates "${POST_REQUEST_FAIL}" action correctly`, () => {
    const putId = 'caf18adc-519f-46e6-a03b-f0106165bad1';
    const expectedAction: IAction = {
      type: POST_REQUEST_FAIL,
      payload: {
        id: putId,
        error,
        retryAction: mockRetryThunk
      }
    };

    const createdAction = postFailed(putId, error, mockRetryThunk);

    expect(createdAction).toEqual(expectedAction);
  });
});
