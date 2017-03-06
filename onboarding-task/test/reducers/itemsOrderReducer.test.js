import Immutable from 'immutable';

import {
  CREATE_ITEM_IN_LIST,
  DELETE_ITEM_FROM_LIST,
} from '../../src/constants/actionTypes';
import { itemsOrderReducer } from '../../src/reducers/itemsReducers/itemsOrderReducer';
import { deleteListItem } from '../../src/actionCreators/actionCreators';
import { createListItemFactory } from '../../src/actionCreators/createListItemFactory';

describe('itemsOrderReducer ', () => {
  const emptyState = new Immutable.List();
  const nonemptyState = Immutable.List.of('test-id-1', 'test-id-2', 'test-id-3', 'test-id-4');
  const createListItem = createListItemFactory(() => 'test-id-0');

  it('adds given id into state when ' + CREATE_ITEM_IN_LIST + ' action is dispatched and empty state is passed in', () => {
    const expectedState = Immutable.List.of('test-id-0');
    const actualState = itemsOrderReducer(emptyState, createListItem('Testing...'));

    expect(actualState).toEqual(expectedState);
  });

  it('adds given id into state when ' + CREATE_ITEM_IN_LIST + ' action is dispatched and nonempty state is passed in', () => {
    const expectedState = nonemptyState.push('test-id-0');
    const actualState = itemsOrderReducer(nonemptyState, createListItem('Testing...'));

    expect(actualState).toEqual(expectedState);
  });

  it('deletes given id from the state when ' + DELETE_ITEM_FROM_LIST + ' action is dispatched', () => {
    const expectedState = nonemptyState.splice(1, 1);
    const actualState = itemsOrderReducer(nonemptyState, deleteListItem('test-id-2'));

    expect(actualState).toEqual(expectedState);
  });
});
