import { fetchItemsFailure } from '../../src/actionCreators/fetchItemsActionCreators.ts';
import { sendItemSuccess, sendItemFailure } from '../../src/actionCreators/sendItemActionCreators.ts';
import { errorReducer } from '../../src/reducers/itemsReducers/itemsReducer.ts';
import {
  FETCH_ITEMS_FAILURE,
  SEND_ITEM_FAILURE,
  SEND_ITEM_SUCCESS,
} from '../../src/constants/actionTypes.ts';

describe('isFetchingReducer ', () => {
  const errorMessage = 'testError';
  it(`returns payload.errorMessage when ${FETCH_ITEMS_FAILURE} action is dispatched`, () => {
    const acutalResult = errorReducer('', fetchItemsFailure(errorMessage));

    expect(acutalResult).toEqual(errorMessage);
  });

  it(`returns payload.errorMessage when ${SEND_ITEM_FAILURE} action is dispatched`, () => {
    const acutalResult = errorReducer('', sendItemFailure(errorMessage, 'testUeid'));

    expect(acutalResult).toEqual(errorMessage);
  });

  it(`returns empty string when ${SEND_ITEM_SUCCESS} action is dispatched`, () => {
    const acutalResult = errorReducer('', sendItemSuccess({ id: 'test', ueid: 'testUeid', value: 'testValue' }));

    expect(acutalResult).toEqual('');
  });

  it(`returns empty string when an unknown action is dispatched`, () => {
    const acutalResult = errorReducer('', { type: 'UNKNOWN_ACTION' });

    expect(acutalResult).toEqual('');
  });
});
