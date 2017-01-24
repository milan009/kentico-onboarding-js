import * as Immutable from 'immutable';
import reducersTests from './reducersTests';
import itemsReducer from '../../src/reducers/items';
import addItem from '../../src/actions/addItem';
import deleteItem from '../../src/actions/deleteItem';
import updateItemDescription from '../../src/actions/updateItemDescription';
import updateAllItemsDescription from '../../src/actions/updateAllItemsDescription';
import Item from '../../src/models/Item';
import EditedItem from '../../src/models/EditedItem';

describe('items', reducersTests(itemsReducer, () => {
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

  it('update all description action does modify all edited items', () => {
    const item1 = new Item('test description 1');
    const item2 = new Item('test description 2');
    const item3 = new Item('test description 3');
    const updatedItem1 = item1.set('description', 'new');
    const updatedItem2 = item2.set('description', 'newer');
    const editedItems = new Immutable
      .Map()
      .set(item2.id, new EditedItem(updatedItem2.description))
      .set(item1.id, new EditedItem(updatedItem1.description));
    const action = updateAllItemsDescription(editedItems);
    const currentState = new Immutable
      .OrderedMap()
      .set(item1.id, item1)
      .set(item2.id, item2)
      .set(item3.id, item3);
    const expectedState = new Immutable
      .OrderedMap()
      .set(item1.id, updatedItem1)
      .set(item2.id, updatedItem2)
      .set(item3.id, item3);

    const actualState = itemsReducer(currentState, action);

    expect(actualState).toEqualImmutable(expectedState);
  });
}));
