import { OrderedSet } from 'immutable';
import { itemsOrder } from '../../src/reducers/itemsOrder.ts';
import { deleteItem } from '../../src/actions/itemsActionCreators.ts';
import { addItemFactory } from '../../src/actions/addItemFactory.ts';

describe('itemsOrder', () => {
  const addItem = addItemFactory(() => 'uuid2');

  it('should return initial state', () => {
    const expectedOrder = OrderedSet();
    const itemOrderBefore = undefined;

    const itemOrderAfter = itemsOrder(itemOrderBefore, { type: 'NOT_DEFINED', payload: undefined });

    expect(itemOrderAfter).toEqual(expectedOrder);
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
