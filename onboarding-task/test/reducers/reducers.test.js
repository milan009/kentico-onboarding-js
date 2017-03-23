import * as Immutable from 'immutable';

import {ItemFlags} from '../../src/models/ItemFlags.ts';
import {Item} from '../../src/models/Item.ts';
import {toggleItemViewMode, editItem} from '../../src/actions/actionCreators';
import {itemFlagReducer} from '../../src/reducers/itemFlagReducer';
import {editItemValueReducer} from '../../src/reducers/editItemValueReducer';
import {saveItemEditReducer} from '../../src/reducers/saveItemEditReducer';

describe('FlagsItemsReducer - toggle view mode', () => {
  it('switch to edit mode(EditMode=true)', () => {
    const id = 'da5cbf5f-2d20-4945-b8d2-4cc3b6be1542';
    const state = Immutable.Map().set(
      id,
      new ItemFlags({
        id,
        editMode: false
      })
    );

    const actualState = itemFlagReducer(state, toggleItemViewMode(id));
    expect(actualState.get(id).editMode).toEqual(true);
  });
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
  });
});

describe('save item edit', () => {
  it('set new value for existing item and toggle view mode to label(= editMode: false)', () => {
    const id = 'da5cbf5f-2d20-4945-b8d2-4cc3b6be1542';
    const item = new Item({
      id,
      value: 'old text'
    });
    const itemFlags = new ItemFlags({
      id,
      editMode: true
    });
    const items = Immutable.Map().set(id, item);
    const displayFlags = Immutable.Map().set(id, itemFlags);
    const expectedText = 'expected text';

    const state = {items: items, itemsDisplayFlags: displayFlags};
    const expectedState = {
      items: items.setIn([id, 'value'], expectedText),
      itemsDisplayFlags: displayFlags.setIn([id, 'editMode'], false)
    };

    const actualState = saveItemEditReducer(state, editItem(id, expectedText));
    expect(expectedState).toEqual(actualState);
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
    });
  });
});
