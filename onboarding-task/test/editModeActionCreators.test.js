import { startEditItem, stopEditItem } from '../src/actions/areEditableActionCreators.js';
import { START_EDIT_ITEM, STOP_EDIT_ITEM } from '../src/actions/actionTypes.js';

describe('editModeActionCreators', () => {
  const testId = '0aeeaa2b-1a2a-482c-b2a6-b172109071e7';

  it('returns start edit item action', () => {
    expect(startEditItem(testId)).toEqual({
      type: START_EDIT_ITEM,
      payload: {
        id: testId,
      },
    });
  });

  it('returns stop edit item action', () => {
    expect(stopEditItem(testId)).toEqual({
      type: STOP_EDIT_ITEM,
      payload: {
        id: testId,
      },
    });
  });
});

