import { Map as ImmutableMap, List as ImmutableList } from 'immutable';

import { app } from '../../src/reducers/reducers';
import { Item } from '../../src/models/Item';
import {
  ITEM_ADDED,
  ITEM_SAVED,
  ITEM_DELETED,
  START_EDITING_ITEM,
  STOP_EDITING_ITEM,
  UPDATE_ITEM_TEXT,
} from '../../src/actions/actionTypes';
import {
  addItem,
  saveItem,
  deleteItem,
  startEditingItem,
  stopEditingItem,
  updateItemText,
} from '../../src/actions/actionCreators';
import { addItemFactory } from '../../src/actions/actionCreatorsFactory'

describe('app reducer', () => {
  it('returns initial state correctly', () => {
    expect(app(undefined, {})).toEqual({ items: ImmutableMap(), orderedIds: ImmutableList() });
  });

  it('adds item to state correctly', () => {
    const expectedItems = ImmutableMap().set('5', new Item({ id: '5', isEditing: false, textSaved: 'textAdded', textShown: 'textAdded' }));
    const expectedOrderedIds = ImmutableList().push('5');

    const action = addItemFactory(() => '5')('textAdded');

    expect(app({ items: ImmutableMap(), orderedIds: ImmutableList() }, action)).toEqual({ items: expectedItems, orderedIds: expectedOrderedIds });
  });

  it('deletes item from state correctly', () => {
    const originalItems = ImmutableMap().set('5', new Item({ id: '5', isEditing: false, textSaved: 'text', textShown: 'text' }));
    const expectedItems = originalItems.delete('5');

    const originalOrderedIds = ImmutableList().push('5');
    const expectedOrderedIds = originalOrderedIds.filter(x => x !== '5');

    const action = deleteItem('5');

    expect(app({ items: originalItems, orderedIds: originalOrderedIds }, action)).toEqual({ items: expectedItems, orderedIds: expectedOrderedIds });
  });

  it('saves item correctly', () => {
    const originalItems = ImmutableMap().set('5', new Item({ id: '5', isEditing: false, textSaved: 'text', textShown: 'text' }));
    const expectedItems = originalItems.set('5', new Item({ id: '5', isEditing: false, textSaved: 'updatedText', textShown: 'updatedText' }));

    const originalOrderedIds = ImmutableList().push('5');
    const expectedOrderedIds = originalOrderedIds;

    const action = saveItem('5', 'updatedText');

    expect(app({ items: originalItems, orderedIds: originalOrderedIds }, action)).toEqual({ items: expectedItems, orderedIds: expectedOrderedIds });
  });

  it('starts editing item correctly', () => {
    const originalItems = ImmutableMap().set('5', new Item({ id: '5', isEditing: false, textSaved: 'text', textShown: 'text' }));
    const expectedItems = originalItems.set('5', new Item({ id: '5', isEditing: true, textSaved: 'text', textShown: 'text' }));

    const originalOrderedIds = ImmutableList().push('5');
    const expectedOrderedIds = originalOrderedIds;

    const action = startEditingItem('5');

    expect(app({ items: originalItems, orderedIds: originalOrderedIds }, action)).toEqual({ items: expectedItems, orderedIds: expectedOrderedIds });
  });

  it('stops editing item correctly', () => {
    const originalItems = ImmutableMap().set('5', new Item({ id: '5', isEditing: true, textSaved: 'text', textShown: 'text' }));
    const expectedItems = originalItems.set('5', new Item({ id: '5', isEditing: false, textSaved: 'text', textShown: 'text' }));

    const originalOrderedIds = ImmutableList().push('5');
    const expectedOrderedIds = originalOrderedIds;

    const action = stopEditingItem('5');

    expect(app({ items: originalItems, orderedIds: originalOrderedIds }, action)).toEqual({ items: expectedItems, orderedIds: expectedOrderedIds });
  });

  it('updates item text correctly', () => {
    const originalItems = ImmutableMap().set('5', new Item({ id: '5', isEditing: true, textSaved: 'textA', textShown: 'textA' }));
    const expectedItems = originalItems.set('5', new Item({ id: '5', isEditing: true, textSaved: 'textA', textShown: 'textB' }));

    const originalOrderedIds = ImmutableList().push('5');
    const expectedOrderedIds = originalOrderedIds;

    const action = updateItemText('5', 'textB');

    expect(app({ items: originalItems, orderedIds: originalOrderedIds }, action)).toEqual({ items: expectedItems, orderedIds: expectedOrderedIds });
  });
});


