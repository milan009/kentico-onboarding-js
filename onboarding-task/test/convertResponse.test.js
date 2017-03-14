import Immutable from 'immutable';

import { ItemRecord } from '../src/models/ItemRecord.ts';
import { convertGetAllResponseResponse } from '../src/utils/convertResponse.ts';
import { ItemUiPropsRecord } from '../src/models/ItemUiPropsRecord.ts';

describe('convertResponse ', () => {
  const item1 = { id: 'id-1', text: 'test-1' };
  const item2 = { id: 'id-2', text: 'test-2' };
  const itemRecord1 = new ItemRecord(item1);
  const itemRecord2 = new ItemRecord(item2);
  it('returns correct empty items part of the appState, when empty array is passed in', () => {
    const expected = {
      byId: new Immutable.Map(),
      orderedIds: new Immutable.List(),
      uiPropsById: new Immutable.Map(),
      isFetching: false,
    };
    const actual = convertGetAllResponseResponse([]);

    expect(actual).toEqual(expected);
  });

  it('returns correct items part of the appState, when array of two correct items is passed in', () => {
    const expected = {
      byId: Immutable.Map.of(item1.id, itemRecord1, item2.id, itemRecord2),
      orderedIds: Immutable.List.of(item1.id, item2.id),
      uiPropsById: Immutable.Map.of(item1.id, new ItemUiPropsRecord(), item2.id, new ItemUiPropsRecord()),
      isFetching: false,
    };
    const actual = convertGetAllResponseResponse([item1, item2]);

    expect(actual).toEqual(expected);
  });
});
