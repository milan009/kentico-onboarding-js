import {
  ITEM_CHANGE_CANCELLED,
  ITEM_MAKE_EDITABLE,
} from '../../src/actions/actionTypes.ts';
import {
  cancelChange,
  makeEditable,
} from '../../src/actions/actionCreators.ts';

describe('Action creators', () => {
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
});
