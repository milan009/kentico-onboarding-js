import { Set } from 'immutable';
import { startEditItem, stopEditItem } from '../src/actions/editModeActionCreators.js';

describe('areEditableReducer', () => {
  const testId = '0aeeaa2b-1a2a-482c-b2a6-b172109071e7';

  it('should return initial state for undefined state', () => {
    expect(areEditable(undefined, {})).toEqual(Set());
  });

  it('should add item to areEditable set on START_EDIT_ITEM', () => {
    let areEditableMock = Set();
    areEditableMock = areEditableMock.add(testId);
    expect(areEditable(Set(), startEditItem(testId))).toEqual(areEditableMock);
  });

  it('should delete item in areEditable set on STOP_EDIT_ITEM', () => {
    let areEditableTestSet = Set();
    areEditableTestSet = areEditableTestSet.add(testId);
    expect(areEditable(areEditableTestSet, stopEditItem(testId))).toEqual(Set());
  });
});
