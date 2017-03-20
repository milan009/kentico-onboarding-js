import * as Immutable from 'immutable';

import {toggleItemViewMode, editItem} from '../../src/actions/actionCreators';
import {toggleItemViewModeReducer} from '../../src/reducers/toggleItemViewModeReducer';
import {editItemValueReducer} from '../../src/reducers/editItemValueReducer';

describe('toggle item edit view mode', () => {
  it('switch to edit mode', () => {
    const id = 'da5cbf5f-2d20-4945-b8d2-4cc3b6be1542';
    const flags = {id, editMode: false};


    const actualFlags = toggleItemViewModeReducer(state, toggleItemViewMode(id));
    expect(true).toEqual(actualFlags.get(id).editMode);
  })
});

describe('edit item value', () => {
  it('set new value for existing item', () => {
    const id = 'da5cbf5f-2d20-4945-b8d2-4cc3b6be1542';
    const oldState = Immutable.Map().set(
      id,
      new Item({
        id,
        value: 'old text'
      })
    );
    const expectedNewState = oldState.setIn([id, 'value'], 'expected text');

    const actualState = editItemValueReducer(oldState, editItem(id, 'expected text'));
    expect(expectedNewState).toEqual(actualState);
  })
});
