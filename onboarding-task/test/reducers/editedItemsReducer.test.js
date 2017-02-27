import { Set } from 'immutable';
import { startEditItem, stopEditItem } from '../../src/actions/editedItemsActionCreators.js';
import { editedItems } from '../../src/reducers/editedItemsReducer.js';

describe('editedItemsReducer', () => {
  const testId = '0aeeaa2b-1a2a-482c-b2a6-b172109071e7';

  it('should return initial state for undefined state', () => {
    expect(editedItems(undefined, {})).toEqual(Set());
  });

  it('should add item to editedItems set on START_EDIT_ITEM', () => {
    let expectedEditedItems = Set();
    expectedEditedItems = expectedEditedItems.add(testId);
    const editedItemsBefore = Set();

    const editedItemsAfter = editedItems(editedItemsBefore, startEditItem(testId));

    expect(editedItemsAfter).toEqual(expectedEditedItems);
  });

  it('should delete item in editedItems set on STOP_EDIT_ITEM', () => {
    const expectedEditedItems = Set();
    let editedItemsBefore = Set();
    editedItemsBefore = editedItemsBefore.add(testId);

    const editedItemsAfter = editedItems(editedItemsBefore, stopEditItem(testId));

    expect(editedItemsAfter).toEqual(expectedEditedItems);
  });
});
