import Immutable from 'immutable';

import { ItemRecord } from '../../src/models/ItemRecord';
import { itemsReducer } from '../../src/reducers/itemsReducer';
import { createListItemFactory } from '../../src/actionCreators/createListItemFactory';
import {
  switchFormVisibilityForListItem,
  updateListItem,
  deleteListItem
} from '../../src/actionCreators/actionCreators';
import {
  CREATE_ITEM_IN_LIST,
  SWITCH_FORM_VISIBILITY_FOR_ITEM,
  UPDATE_TEXT_OF_ITEM,
  DELETE_ITEM_FROM_LIST
} from '../../src/constants/actionTypes';

describe('itemsReducer', () => {
  const emptyState = new Immutable.Map();
  const id = 'test-id';
  const id2 = 'test-id-2';
  const falseFormDisplayedRecord = new ItemRecord({ id, text: 'test', formDisplayed: false });
  const trueFormDisplayedRecord = new ItemRecord({ id, text: 'test', formDisplayed: true });

  it('adds new item into empty state when ' + CREATE_ITEM_IN_LIST + ' action is dispatched', () => {
    const newState = itemsReducer(emptyState, createListItemFactory(() => id)('test'));
    const expectedState = Immutable.Map.of(id, falseFormDisplayedRecord);
    expect(newState).toEqual(expectedState);
  });

  it('adds new item into state when ' + CREATE_ITEM_IN_LIST + ' action is dispatched', () => {
    const prevState = Immutable.Map.of(id, trueFormDisplayedRecord);
    const newState = itemsReducer(prevState, createListItemFactory(() => id2)('Testing...'));
    const expectedState = prevState.set(id2, new ItemRecord({ id: id2, text: 'Testing...', formDisplayed: false }));
    expect(newState).toEqual(expectedState);
  });

  it('switches formDisplayed value on item with given id when ' + SWITCH_FORM_VISIBILITY_FOR_ITEM + 'action is dispatched', () => {
    const firstState = Immutable.Map.of(id, falseFormDisplayedRecord);
    const firstExpectedState = Immutable.Map.of(id, trueFormDisplayedRecord);
    const secondState = itemsReducer(firstState, switchFormVisibilityForListItem(id));

    expect(secondState).toEqual(firstExpectedState);

    const thirdState = itemsReducer(secondState, switchFormVisibilityForListItem(id));

    expect(thirdState).toEqual(firstState);
  });

  it('updates text of item with given id when ' + UPDATE_TEXT_OF_ITEM + ' action is dispatched', () => {
    const expectedRecord = new ItemRecord({ id, text: 'test-2', formDisplayed: true });

    const prevState = Immutable.Map.of(id, trueFormDisplayedRecord);

    const expectedState = Immutable.Map.of(id, expectedRecord);

    const nextState = itemsReducer(prevState, updateListItem(id, 'test-2'));

    expect(nextState).toEqual(expectedState);
  });

  it('deletes item with given id when ' + DELETE_ITEM_FROM_LIST + ' action is dispatched', () => {
    const prevState = Immutable.Map.of(id, trueFormDisplayedRecord);

    const nextState = itemsReducer(prevState, deleteListItem(id));

    expect(nextState).toEqual(emptyState);
  });

  it('does nothing when unknown action is dispatched', () => {
    const prevState = Immutable.Map.of(id, trueFormDisplayedRecord);

    const nextState = itemsReducer(prevState, { type: 'UNKNOWN_ACTION', payload: { id } });

    expect(nextState).toEqual(prevState);
  });

  it('returns default state when undefined state is passed in', () => {
    const nextState = itemsReducer(undefined, {});

    expect(nextState).toEqual(emptyState);
  });
});
