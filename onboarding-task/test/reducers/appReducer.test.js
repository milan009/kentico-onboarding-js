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

describe('app reducer', () => {
  const itemsWithOneElement = ImmutableMap().set('5', new Item({ id: '5', isEditing: false, textSaved: 'text', textShown: 'text' })); // TODO rename
  const itemsWithOneEditingElement = ImmutableMap().set('5', new Item({ id: '5', isEditing: true, textSaved: 'text', textShown: 'text' })); // TODO rename
  const orderedIdsWithOneElement = ImmutableList().push('5');

  it('returns initial state correctly', () => {
    expect(app(undefined, {})).toEqual({
      items: {
        itemsByIds: ImmutableMap(),
        orderedIds: ImmutableList(),
      },
    });
  });
  it('does not modify state on unknown action', () => {
    const UNKNOWN_TYPE = 'UNKNOWN_TYPE';
    const action = {
      type: UNKNOWN_TYPE,
      payload: {
        id: '5',
        text: 'rushB',
      },
    };

    expect(app({
      items: {
        itemsByIds: itemsWithOneElement,
        orderedIds: orderedIdsWithOneElement,
      },
    }, action)).toEqual({
      items: {
        itemsByIds: itemsWithOneElement,
        orderedIds: orderedIdsWithOneElement,
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
        itemsByIds: itemsWithOneElement,
        orderedIds: orderedIdsWithOneElement,
      },
    });
  });

  it('deletes item from state correctly', () => {
    const expectedItems = itemsWithOneElement.delete('5');
    const expectedOrderedIds = orderedIdsWithOneElement.filter(x => x !== '5');
    const action = deleteItem('5');

    expect(app({
      items: {
        itemsByIds: itemsWithOneElement,
        orderedIds: orderedIdsWithOneElement,
      },
    }, action)).toEqual({
      items: {
        itemsByIds: expectedItems,
        orderedIds: expectedOrderedIds,
      },
    });
  });

  it('saves item correctly', () => {
    const expectedItems = itemsWithOneElement.set('5', new Item({ id: '5', isEditing: false, textSaved: 'updatedText', textShown: 'updatedText' }));
    const expectedOrderedIds = orderedIdsWithOneElement;
    const action = saveItem('5', 'updatedText');

    expect(app({
      items: {
        itemsByIds: itemsWithOneElement,
        orderedIds: orderedIdsWithOneElement,
      },
    }, action)).toEqual({
      items: {
        itemsByIds: expectedItems,
        orderedIds: expectedOrderedIds,
      },
    });
  });

  it('starts editing item correctly', () => {
    const expectedItems = itemsWithOneElement.set('5', new Item({ id: '5', isEditing: true, textSaved: 'text', textShown: 'text' }));
    const expectedOrderedIds = orderedIdsWithOneElement;
    const action = startEditingItem('5');

    expect(app({
      items: {
        itemsByIds: itemsWithOneElement,
        orderedIds: orderedIdsWithOneElement,
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
        itemsByIds: itemsWithOneEditingElement,
        orderedIds: orderedIdsWithOneElement,
      },
    }, action)).toEqual({
      items: {
        itemsByIds: itemsWithOneElement,
        orderedIds: orderedIdsWithOneElement,
      },
    });
  });

  it('updates item text correctly', () => {
    const expectedItems = itemsWithOneElement.set('5', new Item({ id: '5', isEditing: true, textSaved: 'text', textShown: 'completelyDifferentText' }));
    const action = updateItemText('5', 'completelyDifferentText');

    expect(app({
      items: {
        itemsByIds: itemsWithOneEditingElement,
        orderedIds: orderedIdsWithOneElement,
      },
    }, action)).toEqual({
      items: {
        itemsByIds: expectedItems,
        orderedIds: orderedIdsWithOneElement,
      },
    });
  });
});
