import * as Immutable from 'immutable';

import {ItemFlags} from '../../src/models/ItemFlags.ts';
import {Item} from '../../src/models/Item.ts';
import {toggleItemViewMode, editItem} from '../../src/actions/actionCreators';
import {toggleItemViewModeReducer} from '../../src/reducers/toggleItemViewModeReducer';
import {editItemValueReducer} from '../../src/reducers/editItemValueReducer';

describe('toggle item edit view mode', () => {
  it('switch to edit mode', () => {
    const id = 'da5cbf5f-2d20-4945-b8d2-4cc3b6be1542';
    const state = Immutable.Map().set(
      id,
      new ItemFlags({
        id,
        editMode: false
      })
    );

    const actualState = toggleItemViewModeReducer(state, toggleItemViewMode(id));
    expect(actualState.get(id).editMode).toEqual(true);
  })
});

describe('edit item value', () => {
  it('set new value for existing item', () => {
    const id = 'da5cbf5f-2d20-4945-b8d2-4cc3b6be1542';
    const state = Immutable.Map().set(
      id,
      new Item({
        id,
        value: 'old text'
      })
    );
    const expectedNewState = state.setIn([id, 'value'], 'expected text');

    const actualState = editItemValueReducer(state, editItem(id, 'expected text'));
    expect(expectedNewState).toEqual(actualState);
  })
});

