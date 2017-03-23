import * as Immutable from 'immutable';

import {ItemFlags} from '../../src/models/ItemFlags.ts';
import {Item} from '../../src/models/Item.ts';
import {toggleItemViewMode, editItem, deleteItem, createItem} from '../../src/actions/actionCreators';
import {itemFlagReducer} from '../../src/reducers/itemFlagReducer';
import {itemDataReducer} from '../../src/reducers/itemDataReducer';
import {saveItemEditReducer} from '../../src/reducers/saveItemEditReducer';

describe('FlagsItemsReducer', () => {
  it('toggle view mode: switch to edit mode(EditMode=true)', () => {
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

  it('delete flag for given id', () => {
    const id = 'da5cbf5f-2d20-4945-b8d2-4cc3b6be1542';
    const state = Immutable.Map().set(
      id,
      new ItemFlags({
        id,
        editMode: true
      })
    );

    const actualState = itemFlagReducer(state, deleteItem(id));
    expect(actualState.has(id)).toEqual(false);
  });

  it('create flag for given id', () => {
    const id = 'da5cbf5f-2d20-4945-b8d2-4cc3b6be1542';
    const state = Immutable.Map();

    const actualState = itemFlagReducer(state, createItem(id));
    expect(actualState.has(id)).toEqual(true);
  });
});

describe('itemDataReducer', () => {
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

    const actualState = itemDataReducer(state, editItem(id, 'expected text'));
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

      const actualState = itemDataReducer(state, editItem(id, 'expected text'));
      expect(expectedNewState).toEqual(actualState);
    });
  });
});
