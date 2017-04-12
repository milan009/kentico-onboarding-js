import { sendItemSuccessCreator, sendItemFailure } from '../../src/actionCreators/sendItemActionCreators.ts';
import { successMessageReducer } from '../../src/reducers/itemsReducers/itemsReducer.ts';
import {
  SEND_ITEM_FAILURE,
  SEND_ITEM_SUCCESS,
} from '../../src/constants/actionTypes.ts';

describe('successMessageReducer ', () => {
  const successMessage = 'testSuccess';
  const sentItem = { id: 'test', ueid: 'testUeid', value: 'testValue' };
  it(`returns payload.successMessage when ${SEND_ITEM_SUCCESS} action is dispatched`, () => {
    const acutalResult = successMessageReducer('', sendItemSuccessCreator(sentItem, () => successMessage));

    expect(acutalResult).toEqual(successMessage);
  });

  it(`returns empty string when ${SEND_ITEM_FAILURE} action is dispatched`, () => {
    const acutalResult = successMessageReducer('', sendItemFailure('test', 'testUeid'));

    expect(acutalResult).toEqual('');
  });

  it(`returns empty string when an unknown action is dispatched`, () => {
    const acutalResult = successMessageReducer('', { type: 'UNKNOWN_ACTION' });

    expect(acutalResult).toEqual('');
  });
});
