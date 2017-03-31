import { OrderedMap } from 'immutable';
import { items } from '../../src/reducers/items.ts';
import { deleteItem, updateItem } from '../../src/actions/itemsActionCreators.ts';
import { Item } from '../../src/models/Item.ts';
import { receiveItems } from '../../src/actions/fetchItemsFactory.ts';
import { receivePostItem } from '../../src/actions/postItemFactory.ts';

describe('List reducer', () => {
  const firstTestId = '0aeeaa2b-1a2a-482c-b2a6-b172109071e7';

  it('should return initial state', () => {
    const expectedItems = OrderedMap();
    const itemsBefore = undefined;

    const itemsAfter = items(itemsBefore, { type: 'NOT_DEFINED' });

    expect(itemsAfter).toEqual(expectedItems);
  });

  it('should handle receive items', () => {
    const secondTestId = '70e9ad48-e190-4578-8939-f9afa5b51501';
    const expectedItems = OrderedMap({ [firstTestId]: new Item({ id: firstTestId, text: 'first test' }),
      [secondTestId]: new Item({ id: secondTestId, text: 'second test' }) });
    const receivedItems = [
      {
        id: firstTestId,
        text: 'first test',
        creation: '0001-01-01T00:00:00',
        lastChange: '0001-01-01T00:00:00',
      },
      {
        id: secondTestId,
        text: 'second test',
        creation: '0001-01-01T00:00:00',
        lastChange: '0001-01-01T00:00:00',
      }];
    const itemsBefore = OrderedMap();

    const itemsAfter = items(itemsBefore, receiveItems(receivedItems));

    expect(itemsAfter).toEqual(expectedItems);
  });

  it('should handle receive item', () => {
    const secondTestId = '70e9ad48-e190-4578-8939-f9afa5b51501';
    const expectedItems = OrderedMap({
      [firstTestId]: new Item({ id: firstTestId, text: 'first test' }),
      [secondTestId]: new Item({ id: secondTestId, text: 'second test' }),
    });
    const receivedItem = {
      id: secondTestId,
      text: 'second test',
      creation: '0001-01-01T00:00:00',
      lastChange: '0001-01-01T00:00:00',
    };
    const itemsBefore = OrderedMap({
      [firstTestId]: new Item({ id: firstTestId, text: 'first test' }),
    });

    const itemsAfter = items(itemsBefore, receivePostItem(receivedItem));

    expect(itemsAfter).toEqual(expectedItems);
  });

  it('should handle delete item', () => {
    const expectedItems = OrderedMap();
    const itemsBefore = OrderedMap({ [firstTestId]: new Item({ id: firstTestId, text: 'first add test' }) });

    const itemsAfter = items(itemsBefore, deleteItem(firstTestId));

    expect(itemsAfter).toEqual(expectedItems);
  });

  it('should handle update item', () => {
    const expectedItems = OrderedMap({ [firstTestId]: new Item({ id: firstTestId, text: 'updated text' }) });
    const itemsBefore = OrderedMap({ [firstTestId]: new Item({ id: firstTestId, text: 'first add test' }) });

    const itemsAfter = items(itemsBefore, updateItem(firstTestId, 'updated text'));

    expect(itemsAfter).toEqual(expectedItems);
  });
});
