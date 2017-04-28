import { Map as ImmutableMap, List as ImmutableList } from 'immutable';

import { app } from '../../src/reducers/appReducer';
import { Item } from '../../src/models/Item';
import {
  saveItem,
  deleteItem,
  startEditingItem,
  stopEditingItem,
  updateItemText,
} from '../../src/actions/actionCreators';
import { addItemFactory } from '../../src/actions/actionCreatorsFactory';
import { unknownAction } from '../actions/helperActions';

describe('app reducer', () => {
  const defaultItems = ImmutableMap().set('5', new Item({ id: '5', isEditing: false, textSaved: 'text', textShown: 'text' }));
  const itemsWithEditingItem = ImmutableMap().set('5', new Item({ id: '5', isEditing: true, textSaved: 'text', textShown: 'text' }));
  const defaultOrderedIds = ImmutableList().push('5');

  it('returns initial state correctly', () => {
    expect(app(undefined, {})).toEqual({
      items: {
        itemsByIds: ImmutableMap(),
        orderedIds: ImmutableList(),
      },
    });
  });
  it('does not modify state on unknown action', () => {
    expect(app({
      items: {
        itemsByIds: defaultItems,
        orderedIds: defaultOrderedIds,
      },
    }, unknownAction)).toEqual({
      items: {
        itemsByIds: defaultItems,
        orderedIds: defaultOrderedIds,
      },
    });
  });

  it('adds item to state correctly', () => {
    const action = addItemFactory(() => '5')('text');

    expect(app({
      items: {
        itemsByIds: ImmutableMap(),
        orderedIds: ImmutableList(),
      },
    }, action)).toEqual({
      items: {
        itemsByIds: defaultItems,
        orderedIds: defaultOrderedIds,
      },
    });
  });

  it('deletes item from state correctly', () => {
    const expectedItems = defaultItems.delete('5');
    const expectedOrderedIds = defaultOrderedIds.filter(x => x !== '5');
    const action = deleteItem('5');

    expect(app({
      items: {
        itemsByIds: defaultItems,
        orderedIds: defaultOrderedIds,
      },
    }, action)).toEqual({
      items: {
        itemsByIds: expectedItems,
        orderedIds: expectedOrderedIds,
      },
    });
  });

  it('saves item correctly', () => {
    const expectedItems = defaultItems.set('5', new Item({ id: '5', isEditing: false, textSaved: 'updatedText', textShown: 'updatedText' }));
    const expectedOrderedIds = defaultOrderedIds;
    const action = saveItem('5', 'updatedText');

    expect(app({
      items: {
        itemsByIds: defaultItems,
        orderedIds: defaultOrderedIds,
      },
    }, action)).toEqual({
      items: {
        itemsByIds: expectedItems,
        orderedIds: expectedOrderedIds,
      },
    });
  });

  it('starts editing item correctly', () => {
    const expectedItems = defaultItems.set('5', new Item({ id: '5', isEditing: true, textSaved: 'text', textShown: 'text' }));
    const expectedOrderedIds = defaultOrderedIds;
    const action = startEditingItem('5');

    expect(app({
      items: {
        itemsByIds: defaultItems,
        orderedIds: defaultOrderedIds,
      },
    }, action)).toEqual({
      items: {
        itemsByIds: expectedItems,
        orderedIds: expectedOrderedIds,
      },
    });
  });

  it('stops editing item correctly', () => {
    const action = stopEditingItem('5');

    expect(app({
      items: {
        itemsByIds: itemsWithEditingItem,
        orderedIds: defaultOrderedIds,
      },
    }, action)).toEqual({
      items: {
        itemsByIds: defaultItems,
        orderedIds: defaultOrderedIds,
      },
    });
  });

  it('updates item text correctly', () => {
    const expectedItems = defaultItems.set('5', new Item({ id: '5', isEditing: true, textSaved: 'text', textShown: 'completelyDifferentText' }));
    const action = updateItemText('5', 'completelyDifferentText');

    expect(app({
      items: {
        itemsByIds: itemsWithEditingItem,
        orderedIds: defaultOrderedIds,
      },
    }, action)).toEqual({
      items: {
        itemsByIds: expectedItems,
        orderedIds: defaultOrderedIds,
      },
    });
  });
});
