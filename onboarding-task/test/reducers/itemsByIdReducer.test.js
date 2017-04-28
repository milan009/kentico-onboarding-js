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

describe('itemsById reducer', () => { // TODO extract, check for copy paste code
  const defaultItem = new Item({ id: '5', isEditing: false, textSaved: 'text', textShown: 'text' });
  const itemsWithOneElement = ImmutableMap().set('5', defaultItem);

  it('doenst modify items on unknown action', () => {
    const UNKNOWN_TYPE = 'UNKNOWN_TYPE';
    const action = {
      type: UNKNOWN_TYPE,
      payload: {
        id: '5',
        text: 'rushB',
      },
    };
    expect(getItemsById(itemsWithOneElement, action)).toEqual(itemsWithOneElement);
  });

  it('adds item correctly', () => {
    const action = addItemFactory(() => '5')('text');
    const emptyItems = ImmutableMap();

    expect(getItemsById(emptyItems, action)).toEqual(itemsWithOneElement);
  });

  it('deletes item correctly', () => {
    const action = deleteItem('5');
    const expectedItems = itemsWithOneElement.delete('5');

    expect(getItemsById(itemsWithOneElement, action)).toEqual(expectedItems);
  });

  it('saves item correctly', () => {
    const action = saveItem('5', 'nexText');
    const expectedItems = itemsWithOneElement.set('5', getItem(defaultItem, action)); // TODO should be unit

    expect(getItemsById(itemsWithOneElement, action)).toEqual(expectedItems);
  });

  it('starts editing item correctly', () => {
    const action = startEditingItem('5');
    const expectedItems = itemsWithOneElement.set('5', getItem(defaultItem, action)); // TODO should be unit

    expect(getItemsById(itemsWithOneElement, action)).toEqual(expectedItems);
  });

  it('stops editing item correctly', () => {
    const action = stopEditingItem('5');
    const expectedItems = itemsWithOneElement.set('5', getItem(defaultItem, action)); // TODO should be unit

    expect(getItemsById(itemsWithOneElement, action)).toEqual(expectedItems);
  });

  it('updates item text correctly', () => {
    const action = updateItemText('5', 'nexText');
    const expectedItems = itemsWithOneElement.set('5', getItem(defaultItem, action)); // TODO should be unit

    expect(getItemsById(itemsWithOneElement, action)).toEqual(expectedItems);
  });
});
