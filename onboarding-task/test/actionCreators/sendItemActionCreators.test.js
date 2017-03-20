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
