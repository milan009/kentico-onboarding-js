import { Set } from 'immutable';
import { startEditItem, stopEditItem } from '../../src/actions/editedItemsActionCreators.js';
import { editedItems } from '../../src/reducers/editedItemsReducer.js';

describe('editedItemsReducer', () => {
  const testId = '0aeeaa2b-1a2a-482c-b2a6-b172109071e7';

  it('should return initial state for undefined state', () => {
    expect(editedItems(undefined, {})).toEqual(Set());
  });

  it('should add item to editedItems set on START_EDIT_ITEM', () => {
    let editedItemsMock = Set();
    editedItemsMock = editedItemsMock.add(testId);
    expect(editedItems(Set(), startEditItem(testId))).toEqual(editedItemsMock);
  });

  it('should delete item in editedItems set on STOP_EDIT_ITEM', () => {
    let editedItemsTestSet = Set();
    editedItemsTestSet = editedItemsTestSet.add(testId);
    expect(editedItems(editedItemsTestSet, stopEditItem(testId))).toEqual(Set());
  });
});
