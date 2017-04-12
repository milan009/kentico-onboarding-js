import Immutable from 'immutable';

import { ItemRecord } from '../../src/models/ItemRecord.ts';
import { itemsByIdsReducer } from '../../src/reducers/itemsReducers/itemsByIdsReducer.ts';
import { createListItemAction } from '../../src/actionCreators/createListItemFactory.ts';
import {
  updateListItem,
  deleteListItem,
} from '../../src/actionCreators/actionCreators.ts';
import {
  CREATE_ITEM_IN_LIST,
  UPDATE_TEXT_OF_ITEM,
  DELETE_ITEM_FROM_LIST,
  FETCH_ITEMS_SUCCESS,
} from '../../src/constants/actionTypes.ts';
import { fetchItemsSuccess } from '../../src/actionCreators/fetchItemsActionCreators.ts';

describe('itemsByIdsReducer', () => {
  const emptyState = new Immutable.Map();
  const id = 'test-id';
  const id2 = 'test-id-2';
  const record1 = new ItemRecord({ id, text: 'test' });
  const record2 = new ItemRecord({ id, text: 'test-2' });

  it(`adds new item into empty state when ${CREATE_ITEM_IN_LIST} action is dispatched`, () => {
    const newState = itemsByIdsReducer(emptyState, createListItemAction(id, 'test'));
    const expectedState = Immutable.Map.of(id, record1);

    expect(newState).toEqual(expectedState);
  });

  it(`adds new item into state when ${CREATE_ITEM_IN_LIST} action is dispatched`, () => {
    const prevState = Immutable.Map.of(id, record2);
    const newState = itemsByIdsReducer(prevState, createListItemAction(id2, 'Testing...'));
    const expectedState = prevState.set(id2, new ItemRecord({ id: id2, text: 'Testing...' }));

    expect(newState).toEqual(expectedState);
  });

  it(`updates text of item with given id when ${UPDATE_TEXT_OF_ITEM} action is dispatched`, () => {
    const expectedRecord = record2;

    const prevState = Immutable.Map.of(id, record1);
    const expectedState = Immutable.Map.of(id, expectedRecord);
    const nextState = itemsByIdsReducer(prevState, updateListItem(id, 'test-2'));

    expect(nextState).toEqual(expectedState);
  });

  it(`deletes item with given id when ${DELETE_ITEM_FROM_LIST} action is dispatched`, () => {
    const prevState = Immutable.Map.of(id, record2);
    const nextState = itemsByIdsReducer(prevState, deleteListItem(id));

    expect(nextState).toEqual(emptyState);
  });

  it(`returns Immutable.Map of all items fetched when ${FETCH_ITEMS_SUCCESS} action is dispatched`, () => {
    const prevState = Immutable.Map.of(id, record2);
    const ids = ['id-0', 'id-1', 'id-2'];
    const texts = ['text-0', 'text-1', 'text-2'];
    const expectedState = Immutable.Map.of(
      ids[0], new ItemRecord({ id: ids[0], text: texts[0] }),
      ids[1], new ItemRecord({ id: ids[1], text: texts[1] }),
      ids[2], new ItemRecord({ id: ids[2], text: texts[2] }),
    );
    const fetchedItems = [
      { id: ids[0], value: texts[0], ueid: 'ueid0' },
      { id: ids[1], value: texts[1], ueid: 'ueid1' },
      { id: ids[2], value: texts[2], ueid: 'ueid2' },
    ];
    const actualState = itemsByIdsReducer(prevState, fetchItemsSuccess(fetchedItems));

    expect(actualState).toEqual(expectedState);
  });

  it('does nothing when unknown action is dispatched', () => {
    const prevState = Immutable.Map.of(id, record2);
    const nextState = itemsByIdsReducer(prevState, { type: 'UNKNOWN_ACTION', payload: { id } });

    expect(nextState).toEqual(prevState);
  });

  it('returns default state when undefined state is passed in', () => {
    const nextState = itemsByIdsReducer(undefined, {});

    expect(nextState).toEqual(emptyState);
  });
});
