import * as Immutable from 'immutable';

import {deleteItem} from '../../src/actions/actionCreators';
import {itemsOrderReducer} from '../../src/reducers/itemsOrderReducer';
import {createItemFactory} from '../../src/actions/createItemFactory';

describe('itemsOrderReducer', () => {
  it('delete item for given id', () => {
    const id = 'da5cbf5f-2d20-4945-b8d2-4cc3b6be1542';
    const state = Immutable.OrderedSet().add(id);

    const actualState = itemsOrderReducer(state, deleteItem(id));
    expect(actualState.has(id)).toBeFalsy();
  });

  it('create item for given id', () => {
    const id = 'da5cbf5f-2d20-4945-b8d2-4cc3b6be1542';
    const createItem = createItemFactory(() => id);
    const state = Immutable.OrderedSet();
    const expectedState = state.add(id);

    const actualState = itemsOrderReducer(state, createItem(id));
    expect(actualState.has(id)).toBeTruthy();
  });
});
