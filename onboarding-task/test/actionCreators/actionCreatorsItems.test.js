import {
  ITEM_TOGGLE_EDIT,
} from '../../src/actions/actionTypes.ts';
import {
  toggleEditItem,
} from '../../src/actions/actionCreatorsItems.ts';

describe('actionCreators:', () => {
  const id = 'TestId';

  it(`toggleEditItem returns action ${ITEM_TOGGLE_EDIT}`, () => {
    const expected = {
      type: ITEM_TOGGLE_EDIT,
      payload: {
        id,
      },
    };
    const result = toggleEditItem(id);

    expect(result).toEqual(expected);
  });
});
