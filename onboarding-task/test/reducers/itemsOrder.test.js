import { OrderedSet } from 'immutable';
import { itemsOrder } from '../../src/reducers/itemsOrder.ts';
import { deleteItem } from '../../src/actions/itemsActionCreators.ts';
import { addItemFactory } from '../../src/actions/addItemFactory.ts';
import { receiveItems } from '../../src/actions/fetchItemsFactory.ts';
import { receivePostItem } from '../../src/actions/postItemFactory.ts';

describe('itemsOrder', () => {
  const addItem = addItemFactory(() => 'uuid2');

  it('should return initial state', () => {
    const expectedOrder = OrderedSet();
    const itemOrderBefore = undefined;

    const itemOrderAfter = itemsOrder(itemOrderBefore, { type: 'NOT_DEFINED', payload: undefined });

    expect(itemOrderAfter).toEqual(expectedOrder);
  });

  it('should handle receive items', () => {
    const firstTestId = '0aeeaa2b-1a2a-482c-b2a6-b172109071e7';
    const secondTestId = '70e9ad48-e190-4578-8939-f9afa5b51501';
    const expectedItemOrder = OrderedSet([firstTestId, secondTestId]);
    const itemOrderBefore = OrderedSet();
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

    const itemOrderAfter = itemsOrder(itemOrderBefore, receiveItems(receivedItems));

    expect(itemOrderAfter).toEqual(expectedItemOrder);
  });

  it('should handle receive item', () => {
    const firstTestId = '0aeeaa2b-1a2a-482c-b2a6-b172109071e7';
    const secondTestId = '70e9ad48-e190-4578-8939-f9afa5b51501';
    const expectedItemOrder = OrderedSet([firstTestId, secondTestId]);
    const itemOrderBefore = OrderedSet([firstTestId]);
    const receivedItem = {
      id: secondTestId,
      text: 'second test',
      creation: '0001-01-01T00:00:00',
      lastChange: '0001-01-01T00:00:00',
    };

    const itemOrderAfter = itemsOrder(itemOrderBefore, receivePostItem(receivedItem));

    expect(itemOrderAfter).toEqual(expectedItemOrder);
  });

  it('should push item to set', () => {
    const expectedItemOrder = OrderedSet(['uuid1', 'uuid2']);
    const itemOrderBefore = OrderedSet(['uuid1']);

    const itemOrderAfter = itemsOrder(itemOrderBefore, addItem('test text'));

    expect(itemOrderAfter).toEqual(expectedItemOrder);
  });

  it('should delete item in set', () => {
    const expectedItemOrder = OrderedSet(['uuid1', 'uuid3']);
    const itemOrderBefore = OrderedSet(['uuid1', 'uuid2', 'uuid3']);

    const itemOrderAfter = itemsOrder(itemOrderBefore, deleteItem('uuid2'));

    expect(itemOrderAfter).toEqual(expectedItemOrder);
  });
});
