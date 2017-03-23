import * as Immutable from 'immutable';

import {createItem, deleteItem} from '../../src/actions/actionCreators';
import {itemOrderReducer} from '../../src/reducers/itemOrderReducer';

describe('itemOrderReducer', () => {
  it('delete item for given id', () => {
    const id = 'da5cbf5f-2d20-4945-b8d2-4cc3b6be1542';
    const state = Immutable.OrderedSet().add(id);

    const actualState = itemOrderReducer(state, deleteItem(id));
    expect(actualState.has(id)).toBeFalsy();
  });

  it('create item for given id', () => {
    const id = 'da5cbf5f-2d20-4945-b8d2-4cc3b6be1542';
    const state = Immutable.OrderedSet();
    const expectedState = state.add(id);

    const actualState = itemOrderReducer(state, createItem(id));
    expect(actualState.has(id)).toBeTruthy();
  });
});
