import { ADD_ITEM_TO_LIST, SWITCH_FORM_VISIBILITY_FOR_ITEM, UPDATE_ITEM, DELETE_ITEM_FROM_LIST } from '../src/constants/actionTypes';
import Immutable from 'immutable';

import { ItemRecord } from '../src/models/ItemRecord';
import { listReducer } from '../src/reducers/listReducer';

describe('listReducer', () => {
  it('adds new item into empty List when ' + ADD_ITEM_TO_LIST + ' action is dispatched', () => {
    const id = 'test-id';
    const prevState = {
      items: new Immutable.Map(),
      itemsOrder: new Immutable.List(),
    };
    const newState = listReducer(prevState, { type: ADD_ITEM_TO_LIST, id, text: 'Testing...' });
    const expectedState = {
      items: Immutable.Map.of(id, new ItemRecord({ id, text: 'Testing...', formDisplayed: false })),
      itemsOrder: Immutable.List.of(id),
    };
    expect(newState).toEqual(expectedState);
  });

  it('adds new item into List when ' + ADD_ITEM_TO_LIST + ' action is dispatched', () => {
    const record = new ItemRecord({ id: 'test-id', text: 'test', formDisplayed: true });
    const prevState = {
      items: Immutable.Map.of('test-id', record),
      itemsOrder: Immutable.List.of('test-id'),
    };
    const id = 'test-id-2';
    const newState = listReducer(prevState, { type: ADD_ITEM_TO_LIST, id, text: 'Testing...' });
    const expectedState = prevState;
    expectedState.items = expectedState.items.set(id, new ItemRecord({ id, text: 'Testing...', formDisplayed: false }));
    expectedState.itemsOrder = expectedState.itemsOrder.push(id);
    expect(newState).toEqual(expectedState);
  });

  it('switches formDisplayed value on item with given id when ' + SWITCH_FORM_VISIBILITY_FOR_ITEM + 'action is dispatched', () => {
    const id = 'test-id';
    const falseFormDisplayedRecord = new ItemRecord({ id, text: 'test', formDisplayed: false });
    const trueFormDisplayedRecord = new ItemRecord({ id, text: 'test', formDisplayed: true });
    const firstState = {
      items: Immutable.Map.of(id, falseFormDisplayedRecord),
      itemsOrder: Immutable.List.of(id),
    };
    const firstExpectedState = {
      items: Immutable.Map.of(id, trueFormDisplayedRecord),
      itemsOrder: Immutable.List.of(id),
    };
    const secondState = listReducer(firstState, { type: SWITCH_FORM_VISIBILITY_FOR_ITEM, id });

    expect(secondState).toEqual(firstExpectedState);

    const thirdState = listReducer(secondState, { type: SWITCH_FORM_VISIBILITY_FOR_ITEM, id });

    expect(thirdState).toEqual(firstState);
  });

  it('updates text of item with given id when ' + UPDATE_ITEM + ' action is dispatched', () => {
    const id = 'test-id';
    const prevRecord = new ItemRecord({ id, text: 'test-1', formDisplayed: true });
    const expectedRecord = new ItemRecord({ id, text: 'test-2', formDisplayed: true });

    const prevState = {
      items: Immutable.Map.of(id, prevRecord),
      itemsOrder: Immutable.List.of(id),
    };

    const expectedState = {
      items: Immutable.Map.of(id, expectedRecord),
      itemsOrder: Immutable.List.of(id),
    };

    const nextState = listReducer(prevState, { type: UPDATE_ITEM, id, text: 'test-2' });

    expect(nextState).toEqual(expectedState);
  });

  it('deletes item with given id when ' + DELETE_ITEM_FROM_LIST + ' action is dispatched', () => {
    const id = 'test-id';
    const record = new ItemRecord({ id, text: 'test', formDisplayed: true });
    const prevState = {
      items: Immutable.Map.of(id, record),
      itemsOrder: Immutable.List.of(id),
    };

    const expectedState = {
      items: new Immutable.Map(),
      itemsOrder: new Immutable.List(),
    };

    const nextState = listReducer(prevState, { type: DELETE_ITEM_FROM_LIST, id });

    expect(nextState).toEqual(expectedState);
  });

  it('does nothing when unknown action is dispatched', () => {
    const id = 'test-id';
    const record = new ItemRecord({ id, text: 'test', formDisplayed: true });
    const prevState = {
      items: Immutable.Map.of(id, record),
      itemsOrder: Immutable.List.of(id),
    };

    const nextState = listReducer(prevState, { type: 'UNKNOWN_ACTION', id });

    expect(nextState).toEqual(prevState);
  });

  it('returns default state when undefined state is passed in', () => {
    const expectedState = {
      items: new Immutable.Map(),
      itemsOrder: new Immutable.List(),
    };

    const nextState = listReducer(undefined, {});

    expect(nextState).toEqual(expectedState);
  });
});
