import Immutable from 'immutable';

import {
  CREATE_ITEM_IN_LIST,
  DELETE_ITEM_FROM_LIST,
  FETCH_ITEMS_SUCCESS,
} from '../../src/constants/actionTypes.ts';
import { itemsOrderReducer } from '../../src/reducers/itemsReducers/itemsOrderReducer.ts';
import { deleteListItem } from '../../src/actionCreators/actionCreators.ts';
import { createListItemAction } from '../../src/actionCreators/createListItemFactory.ts';
import { fetchItemsSuccess } from '../../src/actionCreators/fetchItemsActionCreators.ts';

describe('itemsOrderReducer ', () => {
  const emptyState = new Immutable.List();
  const nonemptyState = Immutable.List.of('test-id-1', 'test-id-2', 'test-id-3', 'test-id-4');
  const id = 'test-id-0';

  it(`adds given id into state when ${CREATE_ITEM_IN_LIST} action is dispatched and empty state is passed in`, () => {
    const expectedState = Immutable.List.of('test-id-0');
    const actualState = itemsOrderReducer(emptyState, createListItemAction(id, 'Testing...'));

    expect(actualState).toEqual(expectedState);
  });

  it(`adds given id into state when ${CREATE_ITEM_IN_LIST} action is dispatched and nonempty state is passed in`, () => {
    const expectedState = nonemptyState.push('test-id-0');
    const actualState = itemsOrderReducer(nonemptyState, createListItemAction(id, 'Testing...'));

    expect(actualState).toEqual(expectedState);
  });

  it(`deletes given id from the state when ${DELETE_ITEM_FROM_LIST} action is dispatched`, () => {
    const expectedState = nonemptyState.splice(1, 1);
    const actualState = itemsOrderReducer(nonemptyState, deleteListItem('test-id-2'));

    expect(actualState).toEqual(expectedState);
  });

  it(`returns empty state when no items are fetched and ${FETCH_ITEMS_SUCCESS} action is dispatched`, () => {
    const expectedSate = new Immutable.List();
    const actualState = itemsOrderReducer(nonemptyState, fetchItemsSuccess([]));

    expect(actualState).toEqual(expectedSate);
  });

  it(`returns list of ids of fetched items in the order they came when ${FETCH_ITEMS_SUCCESS} action is dispatched`, () => {
    const expectedState = emptyState.push('test0', 'test1', 'test2');
    const response = [
      { id: 'test0', value: 'text', ueid: 'ueid0' },
      { id: 'test1', value: 'text', ueid: 'ueid' },
      { id: 'test2', value: 'text', ueid: 'ueid' },
    ];
    const actualState = itemsOrderReducer(nonemptyState, fetchItemsSuccess(response));

    expect(actualState).toEqual(expectedState);
  });
});
