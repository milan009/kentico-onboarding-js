import { Item } from '../../src/models/Item';
import { getItem } from '../../src/reducers/items/itemReducer';
import {
  saveItem,
  startEditingItem,
  stopEditingItem,
  updateItemText,
} from '../../src/actions/actionCreators';
import { unknownAction } from '../actions/helperActions';

describe('item reducer', () => {
  const defaultItem = new Item({
    id: '5',
    textSaved: 'text',
    textShown: 'text',
    isEditing: false,
  });

  const editingItem = new Item({
    id: '5',
    textSaved: 'text',
    textShown: 'newText',
    isEditing: true,
  });

  it('does not modify item on unknown action', () => {
    expect(getItem(defaultItem, unknownAction)).toEqual(defaultItem);
  });


  it('starts editing item correctly', () => {
    const action = startEditingItem('5');
    const expectedItem = defaultItem.set('isEditing', true);

    expect(getItem(defaultItem, action)).toEqual(expectedItem);
  });

  it('stops editing item correctly', () => {
    const action = stopEditingItem('5');

    expect(getItem(editingItem, action)).toEqual(defaultItem);
  });

  it('saves item correctly', () => {
    const action = saveItem('5', 'newText');
    const expectedItem = new Item({
      id: '5',
      textSaved: 'newText',
      textShown: 'newText',
      isEditing: false,
    });

    expect(getItem(editingItem, action)).toEqual(expectedItem);
  });

  it('updates item text correctly', () => {
    const action = updateItemText('5', 'differentText');
    const expectedItem = defaultItem.set('textShown', 'differentText');
    expect(getItem(defaultItem, action)).toEqual(expectedItem);
  });
});
