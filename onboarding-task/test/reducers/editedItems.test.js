import * as Immutable from 'immutable';
import Item from '../../src/models/Item';
import reducersTests from './reducersTests';
import editedItemsReducer from '../../src/reducers/editedItems';
import updateItemDescription from '../../src/actions/updateItemDescription';
import updateItemIsEdited from '../../src/actions/updateItemIsEdited';

describe('editedItems', reducersTests(editedItemsReducer, () => {
  it('update isEdited=true action adds new item to state if not present', () => {
    const item = new Item('test description');
    const action = updateItemIsEdited(item.id, true);

    const actualState = editedItemsReducer(undefined, action);

    expect(actualState).toBeImmutableSet();
    expect(actualState.count()).toBe(1);
  });

  it('update isEdited=false action removes item from state if present', () => {
    const item = new Item('test description');
    const action = updateItemIsEdited(item.id, false);
    const currentState = new Immutable.Set([item.id]);

    const actualState = editedItemsReducer(currentState, action);

    expect(actualState).toEqualImmutable(new Immutable.Set());
  });

  it('update isEdited=false action does not add to state if not present', () => {
    const item = new Item('test description');
    const action = updateItemIsEdited(item.id, false);

    const actualState = editedItemsReducer(undefined, action);

    expect(actualState).toEqualImmutable(new Immutable.Set());
  });

  it('update description action removes item from state if present', () => {
    const item = new Item('test description');
    const action = updateItemDescription(item.id, 'what ever description');
    const currentState = new Immutable.Set([item.id]);

    const actualState = editedItemsReducer(currentState, action);

    expect(actualState).toEqualImmutable(new Immutable.Set());
  });
}));

