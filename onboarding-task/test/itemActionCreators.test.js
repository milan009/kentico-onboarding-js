import { addItemFunctionCreator, updateItem, deleteItem, startEditItem, stopEditItem } from '../src/actions/itemActionCreators.js';
import { ADD_ITEM, UPDATE_ITEM, DELETE_ITEM, START_EDIT_ITEM, STOP_EDIT_ITEM } from '../src/actions/actionTypes.js';

describe('action creators', () => {
  const testId = '0aeeaa2b-1a2a-482c-b2a6-b172109071e7';
  const testText = 'testText';
  const addItem = addItemFunctionCreator(() => testId);

  it('returns add item action', () => {
    expect(addItem(testText)).toEqual({
      type: ADD_ITEM,
      payload: {
        text: testText,
        id: testId,
      },
    });
  });

  it('returns update item action', () => {
    expect(updateItem(testId, testText)).toEqual({
      type: UPDATE_ITEM,
      payload: {
        text: testText,
        id: testId,
      },
    });
  });

  it('returns delete item action', () => {
    expect(deleteItem(testId)).toEqual({
      type: DELETE_ITEM,
      payload: {
        id: testId,
      },
    });
  });

  it('returns start edit item action', () => {
    expect(startEditItem(testId)).toEqual({
      type: START_EDIT_ITEM,
      payload: {
        id: testId,
      },
    });
  });

  it('returns stop edit item action', () => {
    expect(stopEditItem(testId)).toEqual({
      type: STOP_EDIT_ITEM,
      payload: {
        id: testId,
      },
    });
  });
});
