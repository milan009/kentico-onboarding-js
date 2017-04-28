import { List as ImmutableList } from 'immutable';

import { getOrderedIds } from '../../src/reducers/items/orderedIdsReducer';
import { deleteItem } from '../../src/actions/actionCreators';
import { addItemFactory } from '../../src/actions/actionCreatorsFactory';
import { unknownAction } from '../actions/helperActions';

describe('orderedIds reducer', () => {
  const defaultOrderedIds = ImmutableList().push('2', '6', '4');

  it('does not modify Ids on unknown action', () => {
    expect(getOrderedIds(defaultOrderedIds, unknownAction)).toEqual(defaultOrderedIds);
  });

  it('deletes item id correctly', () => {
    const action = deleteItem('6');
    const expectedIds = defaultOrderedIds.delete(1);

    expect(getOrderedIds(defaultOrderedIds, action)).toEqual(expectedIds);
  });

  it('adds item id correctly', () => {
    const action = addItemFactory(() => '5')('text');
    const expectedIds = defaultOrderedIds.push('5');

    expect(getOrderedIds(defaultOrderedIds, action)).toEqual(expectedIds);
  });
});
