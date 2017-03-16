import * as Immutable from 'immutable';

import {ItemFlags} from '../../src/models/ItemFlags';
import {toggleItemViewMode} from '../../src/actions/actionCreators';
import {toggleItemViewModeReducer} from '../../src/reducers/toggleItemViewModeReducer';

describe('reducer - toggle item edit view mode', () => {
  it('Switch to edit mode', () => {
    const id = 'da5cbf5f-2d20-4945-b8d2-4cc3b6be1542';
    const state = Immutable.Map<string, ItemFlags>().set(
      id,
      new ItemFlags({
        id,
        editMode: false
      }));
    const expectedFlags = state.setIn([id, 'editMode'], true);

    const actualFlags = toggleItemViewModeReducer(state, toggleItemViewMode(id));
    expect(expectedFlags).toEqual(actualFlags);
  });
});
