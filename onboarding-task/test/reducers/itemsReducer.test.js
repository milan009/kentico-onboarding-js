import { ADD_ITEM_TO_LIST, SWITCH_FORM_VISIBILITY_FOR_ITEM, UPDATE_ITEM, DELETE_ITEM_FROM_LIST } from '../../src/constants/actionTypes';
import Immutable from 'immutable';

import { ItemRecord } from '../../src/models/ItemRecord';
import { itemsReducer } from '../../src/reducers/itemsReducer';

describe('itemsReducer', () => {
  const emptyState = new Immutable.Map();
  const id = 'test-id';
  const id2 = 'test-id-2';
  const falseFormDisplayedRecord = new ItemRecord({ id, text: 'test', formDisplayed: false });
  const trueFormDisplayedRecord = new ItemRecord({ id, text: 'test', formDisplayed: true });

  it('adds new item into empty state when ' + ADD_ITEM_TO_LIST + ' action is dispatched', () => {
    const newState = itemsReducer(emptyState, { type: ADD_ITEM_TO_LIST, id, text: 'Testing...' });
    const expectedState = Immutable.Map.of(id, new ItemRecord({ id, text: 'Testing...', formDisplayed: false }));
    expect(newState).toEqual(expectedState);
  });

  it('adds new item into state when ' + ADD_ITEM_TO_LIST + ' action is dispatched', () => {
    const prevState = Immutable.Map.of(id, trueFormDisplayedRecord);
    const newState = itemsReducer(prevState, { type: ADD_ITEM_TO_LIST, id: id2, text: 'Testing...' });
    const expectedState = prevState.set(id2, new ItemRecord({ id: id2, text: 'Testing...', formDisplayed: false }));
    expect(newState).toEqual(expectedState);
  });

  it('switches formDisplayed value on item with given id when ' + SWITCH_FORM_VISIBILITY_FOR_ITEM + 'action is dispatched', () => {
    const firstState = Immutable.Map.of(id, falseFormDisplayedRecord);
    const firstExpectedState = Immutable.Map.of(id, trueFormDisplayedRecord);
    const secondState = itemsReducer(firstState, { type: SWITCH_FORM_VISIBILITY_FOR_ITEM, id });

    expect(secondState).toEqual(firstExpectedState);

    const thirdState = itemsReducer(secondState, { type: SWITCH_FORM_VISIBILITY_FOR_ITEM, id });

    expect(thirdState).toEqual(firstState);
  });

  it('updates text of item with given id when ' + UPDATE_ITEM + ' action is dispatched', () => {
    const prevRecord = new ItemRecord({ id, text: 'test-1', formDisplayed: true });
    const expectedRecord = new ItemRecord({ id, text: 'test-2', formDisplayed: true });

    const prevState = Immutable.Map.of(id, prevRecord);

    const expectedState = Immutable.Map.of(id, expectedRecord);

    const nextState = itemsReducer(prevState, { type: UPDATE_ITEM, id, text: 'test-2' });

    expect(nextState).toEqual(expectedState);
  });

  it('deletes item with given id when ' + DELETE_ITEM_FROM_LIST + ' action is dispatched', () => {
    const prevState = Immutable.Map.of(id, trueFormDisplayedRecord);

    const nextState = itemsReducer(prevState, { type: DELETE_ITEM_FROM_LIST, id });

    expect(nextState).toEqual(emptyState);
  });

  it('does nothing when unknown action is dispatched', () => {
    const prevState = Immutable.Map.of(id, trueFormDisplayedRecord);

    const nextState = itemsReducer(prevState, { type: 'UNKNOWN_ACTION', id });

    expect(nextState).toEqual(prevState);
  });

  it('returns default state when undefined state is passed in', () => {
    const nextState = itemsReducer(undefined, {});

    expect(nextState).toEqual(emptyState);
  });
});
