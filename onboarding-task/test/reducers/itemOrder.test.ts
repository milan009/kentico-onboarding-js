import { OrderedSet } from 'immutable';
import { itemOrder } from '../../src/reducers/itemOrder';
import { deleteItem } from '../../src/actions/itemsActionCreators';
import { addItemFactory } from '../../src/actions/addItemFactory';

describe('itemOrder', () => {
  const addItem = addItemFactory(() => 'uuid2');

  it('should return initial state', () => {
    const expectedOrder = OrderedSet();
    const itemOrderBefore = undefined;

    const itemOrderAfter = itemOrder(itemOrderBefore, { type: 'NOT_DEFINED', payload: undefined });

    expect(itemOrderAfter).toEqual(expectedOrder);
  });

  it('should push item to list', () => {
    const expectedItemOrder = OrderedSet(['uuid1', 'uuid2']);
    const itemOrderBefore = OrderedSet(['uuid1']);

    const itemOrderAfter = itemOrder(itemOrderBefore, addItem('test text'));

    expect(itemOrderAfter).toEqual(expectedItemOrder);
  });

  it('should delete item in list', () => {
    const expectedItemOrder = OrderedSet(['uuid1', 'uuid3']);
    const itemOrderBefore = OrderedSet(['uuid1', 'uuid2', 'uuid3']);

    const itemOrderAfter = itemOrder(itemOrderBefore, deleteItem('uuid2'));

    expect(itemOrderAfter).toEqual(expectedItemOrder);
  });
});
