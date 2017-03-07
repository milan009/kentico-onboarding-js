import { List } from 'immutable';
import { itemOrder } from '../../src/reducers/itemOrder.ts';
import { ITEM_ORDER_PUSH, ITEM_ORDER_DELETE } from '../../src/actions/actionTypes';

describe('itemOrder', () => {
  it('should return initial state', () => {
    const expectedOrder = List();
    const itemOrderBefore = undefined;

    const itemOrderAfter = itemOrder(itemOrderBefore, { type: 'NOT_DEFINED' });

    expect(itemOrderAfter).toEqual(expectedOrder);
  });

  it('should push item to list', () => {
    const expectedItemOrder = List(['uuid1', 'uuid2']);
    const itemOrderBefore = List(['uuid1']);

    const itemOrderAfter = itemOrder(itemOrderBefore, { type: ITEM_ORDER_PUSH, payload: { id: 'uuid2'} });

    expect(itemOrderAfter).toEqual(expectedItemOrder);
  });

  it('should delete item in list', () => {
    const expectedItemOrder = List(['uuid1', 'uuid3']);
    const itemOrderBefore = List(['uuid1', 'uuid2', 'uuid3']);

    const itemOrderAfter = itemOrder(itemOrderBefore, { type: ITEM_ORDER_DELETE, payload: { id: 'uuid2'} });

    expect(itemOrderAfter).toEqual(expectedItemOrder);
  });
});
