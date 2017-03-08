import { OrderedMap, Set } from 'immutable';
import { selectViewItem } from '../../src/selectors/selectViewItem.ts';
import { ViewItem } from '../../src/viewModels/ViewItem.ts';

describe('selectViewItem', () => {
  const testId = '0aeeaa2b-1a2a-482c-b2a6-b172109071e7';
  const testText = 'test text';

  it('should return true flag if item is edited', () => {
    const expectedResult = new ViewItem({ id: testId, text: testText, isEdited: true, index: 1 });
    const initialState = {
      items: OrderedMap({ [testId]: new ViewItem({ id: testId, text: testText }) }),
      editedItems: Set([testId]),
    };

    const selectorResult = selectViewItem(initialState, testId, 0);

    expect(selectorResult).toEqual(expectedResult);
  });

  it('should return false flag if item is not edited', () => {
    const expectedResult = new ViewItem({ id: testId, text: testText, isEdited: false, index: 1 });
    const initialState = {
      items: OrderedMap({ [testId]: new ViewItem({ id: testId, text: testText }) }),
      editedItems: Set(),
    };

    const selectorResult = selectViewItem(initialState, testId, 0);

    expect(selectorResult).toEqual(expectedResult);
  });
});
