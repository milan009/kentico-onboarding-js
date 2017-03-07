import Immutable from 'immutable';

import { ItemRecord } from '../../src/models/ItemRecord.ts';
import { itemsByIdsReducer } from '../../src/reducers/itemsReducers/itemsByIdsReducer.ts';
import { createListItemFactory } from '../../src/actionCreators/createListItemFactory.ts';
import {
  switchFormVisibilityForListItem,
  updateListItem,
  deleteListItem,
} from '../../src/actionCreators/actionCreators.ts';
import {
  CREATE_ITEM_IN_LIST,
  SWITCH_FORM_VISIBILITY_FOR_ITEM,
  UPDATE_TEXT_OF_ITEM,
  DELETE_ITEM_FROM_LIST,
} from '../../src/constants/actionTypes.ts';

describe('itemsByIdsReducer', () => {
  const emptyState = new Immutable.Map();
  const id = 'test-id';
  const id2 = 'test-id-2';
  const falseFormDisplayedRecord = new ItemRecord({ id, text: 'test' });
  const trueFormDisplayedRecord = new ItemRecord({ id, text: 'test' });

  it('adds new item into empty state when ' + CREATE_ITEM_IN_LIST + ' action is dispatched', () => {
    const createListItem = createListItemFactory(() => id);
    const newState = itemsByIdsReducer(emptyState, createListItem('test'));
    const expectedState = Immutable.Map.of(id, falseFormDisplayedRecord);

    expect(newState).toEqual(expectedState);
  });

  it('adds new item into state when ' + CREATE_ITEM_IN_LIST + ' action is dispatched', () => {
    const createListItem = createListItemFactory(() => id2);
    const prevState = Immutable.Map.of(id, trueFormDisplayedRecord);
    const newState = itemsByIdsReducer(prevState, createListItem('Testing...'));
    const expectedState = prevState.set(id2, new ItemRecord({ id: id2, text: 'Testing...' }));

    expect(newState).toEqual(expectedState);
  });

  it('updates text of item with given id when ' + UPDATE_TEXT_OF_ITEM + ' action is dispatched', () => {
    const expectedRecord = new ItemRecord({ id, text: 'test-2' });

    const prevState = Immutable.Map.of(id, trueFormDisplayedRecord);
    const expectedState = Immutable.Map.of(id, expectedRecord);
    const nextState = itemsByIdsReducer(prevState, updateListItem(id, 'test-2'));

    expect(nextState).toEqual(expectedState);
  });

  it('deletes item with given id when ' + DELETE_ITEM_FROM_LIST + ' action is dispatched', () => {
    const prevState = Immutable.Map.of(id, trueFormDisplayedRecord);
    const nextState = itemsByIdsReducer(prevState, deleteListItem(id));

    expect(nextState).toEqual(emptyState);
  });

  it('does nothing when unknown action is dispatched', () => {
    const prevState = Immutable.Map.of(id, trueFormDisplayedRecord);
    const nextState = itemsByIdsReducer(prevState, { type: 'UNKNOWN_ACTION', payload: { id } });

    expect(nextState).toEqual(prevState);
  });

  it('returns default state when undefined state is passed in', () => {
    const nextState = itemsByIdsReducer(undefined, {});

    expect(nextState).toEqual(emptyState);
  });
});
