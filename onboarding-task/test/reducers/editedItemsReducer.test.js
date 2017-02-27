import { Set } from 'immutable';
import { startEditItem, stopEditItem } from '../../src/actions/editedItemsActionCreators.js';
import { editedItems } from '../../src/reducers/editedItemsReducer.js';

describe('editedItemsReducer', () => {
  const testId = '0aeeaa2b-1a2a-482c-b2a6-b172109071e7';

  it('should return initial state for undefined state', () => {
    const expectedEditedItems = Set();
    const editedItemsBefore = undefined;

    const editedItemsAfter = editedItems(undefined, { type: 'NOT_DEFINED' });

    expect(editedItemsAfter).toEqual(expectedEditedItems);
  });

  it('should add item to editedItems set on START_EDIT_ITEM', () => {
    const expectedEditedItems = Set([testId]);
    const editedItemsBefore = Set();

    const editedItemsAfter = editedItems(editedItemsBefore, startEditItem(testId));

    expect(editedItemsAfter).toEqual(expectedEditedItems);
  });

  it('should delete item in editedItems set on STOP_EDIT_ITEM', () => {
    const expectedEditedItems = Set();
    const editedItemsBefore = Set([testId]);

    const editedItemsAfter = editedItems(editedItemsBefore, stopEditItem(testId));

    expect(editedItemsAfter).toEqual(expectedEditedItems);
  });
});
