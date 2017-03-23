import * as Immutable from 'immutable';

import {ItemFlags} from '../../src/models/ItemFlags.ts';
import {Item} from '../../src/models/Item.ts';
import {editItem} from '../../src/actions/actionCreators';
import {saveItemEditReducer} from '../../src/reducers/itemEditSaveReducer';


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
});
