import Immutable from 'immutable';

import { itemsUiPropsReducer } from '../../src/reducers/itemsReducers/itemsUiPropsReducer.ts';
import { ItemUiPropsRecord } from '../../src/models/ItemUiPropsRecord.ts';
import { createListItemAction } from '../../src/actionCreators/createListItemFactory.ts';
import { switchFormVisibilityForListItem, deleteListItem } from '../../src/actionCreators/actionCreators.ts';
import {
  CREATE_ITEM_IN_LIST,
  SWITCH_FORM_VISIBILITY_FOR_ITEM,
  DELETE_ITEM_FROM_LIST,
  FETCH_ITEMS_SUCCESS,
} from '../../src/constants/actionTypes.ts';
import { fetchItemsSuccess } from '../../src/actionCreators/fetchItemsActionCreators.ts';

describe('uiPropsReducer ', () => {
  const id = 'test-id';
  const falseRecord = new ItemUiPropsRecord({ formDisplayed: false });
  const trueRecord = new ItemUiPropsRecord({ formDisplayed: true });
  const emptyState = new Immutable.Map();
  const oneItemFalseState = emptyState.set(id, falseRecord);
  const oneItemTrueState = emptyState.set(id, trueRecord);

  it(`creates new uiProps and adds them to given id when state is empty and ${CREATE_ITEM_IN_LIST} action is dispatched`, () => {
    const prevState = emptyState;
    const expectedState = oneItemFalseState;
    const nextState = itemsUiPropsReducer(prevState, createListItemAction(id, 'test'));

    expect(nextState).toEqual(expectedState);
  });

  it(`creates new uiProps and adds them to given id when state is nonempty and ${CREATE_ITEM_IN_LIST} action is dispatched`, () => {
    const prevState = oneItemFalseState;
    const expectedState = oneItemFalseState.set('test-id-2', falseRecord);
    const nextState = itemsUiPropsReducer(prevState, createListItemAction('test-id-2', 'test'));

    expect(nextState).toEqual(expectedState);
  });

  it(`switches formDisplayed flag from false to true when ${SWITCH_FORM_VISIBILITY_FOR_ITEM} action is dispatched`, () => {
    const prevState = oneItemFalseState;
    const expectedState = oneItemTrueState;
    const nextState = itemsUiPropsReducer(prevState, switchFormVisibilityForListItem(id));

    expect(nextState).toEqual(expectedState);
  });

  it(`switches formDisplayed flag from true to false when ${SWITCH_FORM_VISIBILITY_FOR_ITEM} action is dispatched`, () => {
    const prevState = oneItemTrueState;
    const expectedState = oneItemFalseState;
    const nextState = itemsUiPropsReducer(prevState, switchFormVisibilityForListItem(id));

    expect(nextState).toEqual(expectedState);
  });

  it(`deletes uiProp with given id when ${DELETE_ITEM_FROM_LIST} action is dispatched`, () => {
    const prevState = oneItemFalseState;
    const expectedState = emptyState;
    const nextState = itemsUiPropsReducer(prevState, deleteListItem(id));

    expect(nextState).toEqual(expectedState);
  });

  it(`returns empty state when no items are fetched and ${FETCH_ITEMS_SUCCESS} action is dispatched`, () => {
    const expectedState = new Immutable.Map();
    const actualState = itemsUiPropsReducer(oneItemFalseState, fetchItemsSuccess([]));

    expect(actualState).toEqual(expectedState);
  });

  it(`returns empty uiProp for every fetched item when ${FETCH_ITEMS_SUCCESS} action is dispatched`, () => {
    const prevState = oneItemFalseState;
    const expectedState = Immutable.Map.of(id, new ItemUiPropsRecord({ savedOnServer: true }), 'id-2', new ItemUiPropsRecord({ savedOnServer: true }));
    const fakeResponse = [{ id, value: 'text', ueid: 'ueid0' }, { id: 'id-2', value: 'test', ueid: 'ueid1' }];
    const actual = itemsUiPropsReducer(prevState, fetchItemsSuccess(fakeResponse));

    expect(actual).toEqual(expectedState);
  });

  it('returns prevState when unknown action is dispatched', () => {
    const prevState = oneItemFalseState;
    const expectedState = oneItemFalseState;
    const nextState = itemsUiPropsReducer(prevState, 'UNKNOWN_ACTION');

    expect(nextState).toEqual(expectedState);
  });

  it('returns default state when undefined is passed in as state', () => {
    const expectedState = emptyState;
    const nextState = itemsUiPropsReducer(undefined, 'UNKNOWN_ACTION');

    expect(nextState).toEqual(expectedState);
  });
});
