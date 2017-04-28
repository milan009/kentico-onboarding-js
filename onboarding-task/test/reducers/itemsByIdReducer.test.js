import { Map as ImmutableMap } from 'immutable';

import { Item } from '../../src/models/Item';
import { getItemsById } from '../../src/reducers/items/itemsByIdReducer';
import { getItem } from '../../src/reducers/items/itemReducer';
import {
  saveItem,
  deleteItem,
  startEditingItem,
  stopEditingItem,
  updateItemText,
} from '../../src/actions/actionCreators';
import { addItemFactory } from '../../src/actions/actionCreatorsFactory';
import { unknownAction } from '../actions/helperActions';

describe('itemsById reducer', () => {
  const defaultItem = new Item({ id: '5', isEditing: false, textSaved: 'text', textShown: 'text' });
  const defaultItems = ImmutableMap().set('5', defaultItem);

  it('does not modify items on unknown action', () => {
    expect(getItemsById(defaultItems, unknownAction)).toEqual(defaultItems);
  });

  it('adds item correctly', () => {
    const action = addItemFactory(() => '5')('text');
    const emptyItems = ImmutableMap();

    expect(getItemsById(emptyItems, action)).toEqual(defaultItems);
  });

  it('deletes item correctly', () => {
    const action = deleteItem('5');
    const expectedItems = defaultItems.delete('5');

    expect(getItemsById(defaultItems, action)).toEqual(expectedItems);
  });

  it('saves item correctly', () => {
    const action = saveItem('5', 'nexText');
    const expectedItems = defaultItems.set('5', getItem(defaultItem, action));

    expect(getItemsById(defaultItems, action)).toEqual(expectedItems);
  });

  it('starts editing item correctly', () => {
    const action = startEditingItem('5');
    const expectedItems = defaultItems.set('5', getItem(defaultItem, action));

    expect(getItemsById(defaultItems, action)).toEqual(expectedItems);
  });

  it('stops editing item correctly', () => {
    const action = stopEditingItem('5');
    const expectedItems = defaultItems.set('5', getItem(defaultItem, action));

    expect(getItemsById(defaultItems, action)).toEqual(expectedItems);
  });

  it('updates item text correctly', () => {
    const action = updateItemText('5', 'nexText');
    const expectedItems = defaultItems.set('5', getItem(defaultItem, action));

    expect(getItemsById(defaultItems, action)).toEqual(expectedItems);
  });
});
