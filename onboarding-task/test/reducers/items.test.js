import * as Immutable from 'immutable';
import * as matchers from 'jest-immutable-matchers';
import itemsReducer from '../../src/reducers/items';
import addItem from '../../src/actions/addItem';
import deleteItem from '../../src/actions/deleteItem';
import updateItemDescription from '../../src/actions/updateItemDescription';
import Item from '../../src/models/Item';

describe('items', () => {
  beforeEach(() => jest.addMatchers(matchers));

  it('undefined action does not change state', () => {
    const expectedState = 'no change';

    const actualState = itemsReducer(expectedState, { });

    expect(actualState).toBe(expectedState);
  });

  it('unknown action does not change state', () => {
    const expectedState = 'no change';

    const actualState = itemsReducer(expectedState, { type: 'NOTKNOWN_ACTION' });

    expect(actualState).toBe(expectedState);
  });

  it('add action adds new item to state', () => {
    const action = addItem('test description');
    const actualState = itemsReducer(undefined, action);

    expect(actualState).toBeImmutableOrderedMap();
    expect(actualState.count()).toBe(1);
  });

  it('delete action removes item from state', () => {
    const item = new Item('test description');
    const currentState = new Immutable
      .OrderedMap()
      .set(item.id, item);

    const action = deleteItem(item.id);
    const actualState = itemsReducer(currentState, action);

    expect(actualState).toEqualImmutable(new Immutable.OrderedMap());
  });

  it('update description action updates existing item in state', () => {
    const item = new Item('test description');
    const expectedDescription = 'new description';
    const expectedItem = item.set('description', expectedDescription);
    const expectedState = new Immutable
      .OrderedMap()
      .set(expectedItem.id, expectedItem);
    const currentState = new Immutable
      .OrderedMap()
      .set(item.id, item);

    const action = updateItemDescription(item.id, expectedDescription);
    const actualState = itemsReducer(currentState, action);

    expect(actualState).toEqualImmutable(expectedState);

    expect(actualState.get(item.id).description).toBe(expectedDescription);
  });

  it('update description action does not modify state for non-existing item', () => {
    const item = new Item('test description');
    const expectedDescription = 'new description';
    const currentState = new Immutable.OrderedMap();

    const action = updateItemDescription(item.id, expectedDescription);
    const actualState = itemsReducer(currentState, action);

    expect(actualState).toEqualImmutable(new Immutable.OrderedMap());
  });
});
