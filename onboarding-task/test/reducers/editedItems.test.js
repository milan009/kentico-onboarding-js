import * as Immutable from 'immutable';
import Item from '../../src/models/Item';
import reducersTests from './reducersTests';
import editedItemsReducer from '../../src/reducers/editedItems';
import updateItemDescription from '../../src/actions/updateItemDescription';
import updateItemIsEdited from '../../src/actions/updateItemIsEdited';
import updateAllItemsDescription from '../../src/actions/updateAllItemsDescription';
import storeEditedItemDescription from '../../src/actions/storeEditedItemDescription';

describe('editedItems', reducersTests(editedItemsReducer, () => {
  it('update isEdited=true action adds new item to state if not present', () => {
    const item = new Item('test description');
    const action = updateItemIsEdited(item.id, true);

    const actualState = editedItemsReducer(undefined, action);

    expect(actualState).toBeImmutableMap();
    expect(actualState.count()).toBe(1);
  });

  it('update isEdited=false action removes item from state if present', () => {
    const item = new Item('test description');
    const action = updateItemIsEdited(item.id, false);
    const currentState = new Immutable
      .Map()
      .set(item.id, 'new description');

    const actualState = editedItemsReducer(currentState, action);

    expect(actualState).toEqualImmutable(new Immutable.Map());
  });

  it('update isEdited=false action does not add to state if not present', () => {
    const item = new Item('test description');
    const action = updateItemIsEdited(item.id, false);

    const actualState = editedItemsReducer(undefined, action);

    expect(actualState).toEqualImmutable(new Immutable.Map());
  });

  it('update description action removes item from state if present', () => {
    const item = new Item('test description');
    const action = updateItemDescription(item.id, 'what ever description');
    const currentState = new Immutable
      .Map()
      .set(item.id, 'new description');

    const actualState = editedItemsReducer(currentState, action);

    expect(actualState).toEqualImmutable(new Immutable.Map());
  });

  it('update all description remotes items from state', () => {
    const item1 = new Item('test description 1');
    const item2 = new Item('test description 2');
    const action = updateAllItemsDescription(undefined);
    const currentState = new Immutable
      .Map()
      .set(item1.id, 'new')
      .set(item2.id, 'newer');

    const actualState = editedItemsReducer(currentState, action);

    expect(actualState).toEqualImmutable(new Immutable.Map());
  });

  it('store edited description action does modify state for existing item', () => {
    const item = new Item('test description');
    const expectedDescription = 'new description';
    const currentState = new Immutable
      .Map()
      .set(item.id, item.description);

    const action = storeEditedItemDescription(item.id, expectedDescription);
    const actualState = editedItemsReducer(currentState, action);

    expect(actualState)
      .toEqualImmutable(new Immutable
        .Map()
        .set(item.id, expectedDescription));
  });

  it('store edited description action does modify state for non-existing item', () => {
    const itemId = 'aGuidIdToBeHereForSure';
    const expectedDescription = 'newer description';
    const currentState = new Immutable.Map();

    const action = storeEditedItemDescription(itemId, expectedDescription);
    const actualState = editedItemsReducer(currentState, action);

    expect(actualState)
      .toEqualImmutable(new Immutable
        .Map()
        .set(itemId, expectedDescription));
  });
}));

