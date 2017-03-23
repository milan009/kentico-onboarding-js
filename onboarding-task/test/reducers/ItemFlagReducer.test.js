import * as Immutable from 'immutable';

import {ItemFlags} from '../../src/models/ItemFlags.ts';
import {toggleItemViewMode, deleteItem, createItemFlags} from '../../src/actions/actionCreators';
import {itemFlagReducer} from '../../src/reducers/itemFlagReducer';

describe('ItemFlagReducer', () => {
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

    const actualState = itemFlagReducer(state, createItemFlags(id));

    expect(actualState.has(id)).toEqual(true);
  });
});
