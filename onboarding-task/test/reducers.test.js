import { ADD_ITEM_TO_LIST, SWITCH_FORM_VISIBILITY_FOR_ITEM, UPDATE_ITEM, DELETE_ITEM_FROM_LIST } from '../src/actionTypes';
import Immutable from 'immutable';

describe('list', () => {
  it('adds new item into empty List when ' + ADD_ITEM_TO_LIST + ' action is dispatched', () => {
    const prevState = {
      items: new Immutable.Map(),
      itemsOrder: new Immutable.List(),
    };
    const newState = list(prevState, { type: ADD_ITEM_TO_LIST, text: 'Testing...' });
    const id = newState.itemsOrder.get(0);
    const expectedState = {
      items: Immutable.Map.of(id, new Immutable.Record({ id, text: 'Testing...', formDisplayed: false })),
      itemsOrder: Immutable.List.of([id]),
    };
    expect(newState).toEqual(expectedState);
  });

  it('adds new item into List when ' + ADD_ITEM_TO_LIST + ' action is dispatched', () => {
    const record = new Immutable.Record({ id: 'test-id', text: 'test', formDisplayed: true });
    const prevState = {
      items: Immutable.Map.of(['test-id', record]),
      itemsOrder: Immutable.List.of(['test-id']),
    };
    const newState = list(prevState, { type: ADD_ITEM_TO_LIST, text: 'Testing...' });
    const id = newState.itemsOrder.get(1);
    const expectedState = prevState;
    expectedState.items.set(id, new Immutable.Record({ id, text: 'Testing...', formDisplayed: false }));
    expectedState.itemsOrder.push(id);
    expect(newState).toEqual(expectedState);
  });

  it('switches formDisplayed value on item with given id when ' + SWITCH_FORM_VISIBILITY_FOR_ITEM + 'action is dispatched', () => {
    const id = 'test-id';
    const falseFormDisplayedRecord = new Immutable.Record({ id, text: 'test', formDisplayed: false });
    const trueFormDisplayedRecord = new Immutable.Record({ id, text: 'test', formDisplayed: true });
    const firstState = {
      items: Immutable.Map.of([id, falseFormDisplayedRecord]),
      itemsOrder: Immutable.List.of([id]),
    };
    const firstExpectedState = {
      items: Immutable.Map.of([id, trueFormDisplayedRecord]),
      itemsOrder: Immutable.List.of([id]),
    };
    const secondState = list(firstState, { type: SWITCH_FORM_VISIBILITY_FOR_ITEM, id });

    expect(secondState).toEqual(firstExpectedState);

    const thirdState = list(secondState, { type: SWITCH_FORM_VISIBILITY_FOR_ITEM, id });

    expect(thirdState).toEqual(firstState);
  });

  it('updates text of item with given id when ' + UPDATE_ITEM + ' action is dispatched', () => {
    const id = 'test-id';
    const prevRecord = new Immutable.Record({ id, text: 'test-1', formDisplayed: true });
    const expectedRecord = new Immutable.Record({ id, text: 'test-2', formDisplayed: true });

    const prevState = {
      items: Immutable.Map.of(id, prevRecord),
      itemsOrder: Immutable.List.of(id),
    };

    const expectedState = {
      items: Immutable.Map.of(id, expectedRecord),
      itemsOrder: Immutable.List.of(id),
    };

    const nextState = list(prevState, { type: UPDATE_ITEM, id, text: 'test-2' });

    expect(nextState).toEqual(expectedState);
  });

  it('deletes item with given id when ' + DELETE_ITEM_FROM_LIST + ' action is dispatched', () => {
    const id = 'test-id';
    const record = new Immutable.Record({ id, text: 'test', formDisplayed: true });
    const prevState = {
      items: Immutable.Map.of(id, record),
      itemsOrder: Immutable.List.of(id),
    };

    const expectedState = {
      items: new Immutable.Map(),
      itemsOrder: new Immutable.List(),
    };

    const nextState = list(prevState, { type: DELETE_ITEM_FROM_LIST, id });

    expect(nextState).toEqual(expectedState);
  });

  it('does nothing when unknown action is dispatched', () => {
    const id = 'test-id';
    const record = new Immutable.Record({ id, text: 'test', formDisplayed: true });
    const prevState = {
      items: Immutable.Map.of(id, record),
      itemsOrder: Immutable.List.of(id),
    };

    const nextState = list(prevState, { type: 'UNKNOWN_ACTION', id });

    expect(nextState).toEqual(prevState);
  });

  it('returns default state when undefined state is passed in', () => {
    const expectedState = {
      items: new Immutable.Map(),
      itemsOrder: new Immutable.List(),
    };

    const nextState = list(undefined);

    expect(nextState).toEqual(expectedState);
  });
});
