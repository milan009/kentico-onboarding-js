import { List as ImmutableList } from 'immutable';

import { getOrderedIds } from '../../src/reducers/orderedIdsReducer';
import {
  deleteItem,
} from '../../src/actions/actionCreators';
import { addItemFactory } from '../../src/actions/actionCreatorsFactory';
describe('orderedIds reducer', () => {
  const defaultOrderedIds = ImmutableList().push('2', '6', '4');

  it('doenst modify Ids on unknown action', () => {
    const UNKNOWN_TYPE = 'UNKNOWN_TYPE';
    const action = {
      type: UNKNOWN_TYPE,
      payload: {
        id: '5',
        text: 'rushB',
      },
    };
    expect(getOrderedIds(defaultOrderedIds, action)).toEqual(defaultOrderedIds);
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
