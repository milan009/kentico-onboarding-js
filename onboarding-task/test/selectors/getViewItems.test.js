import { OrderedMap, Set } from 'immutable';
import { getViewItems } from '../../src/selectors/getViewItems.ts';
import { ViewItem } from '../../src/viewModels/ViewItem.ts';

describe('getViewItems', () => {
  const testId = '0aeeaa2b-1a2a-482c-b2a6-b172109071e7';
  const testText = 'test text';

  it('should return true flag if item is edited', () => {
    const expectedResult = OrderedMap({ [testId]: new ViewItem({ id: testId, text: testText, isEdited: true }) });
    const initialState = {
      items: OrderedMap({ [testId]: new ViewItem({ id: testId, text: testText }) }),
      editedItems: Set([testId]),
    };

    const selectorResult = getViewItems(initialState);

    expect(selectorResult).toEqual(expectedResult);
  });

  it('should return false flag if item is not edited', () => {
    const expectedResult = OrderedMap({ [testId]: new ViewItem({ id: testId, text: testText, isEdited: false }) });
    const initialState = {
      items: OrderedMap({ [testId]: new ViewItem({ id: testId, text: testText }) }),
      editedItems: Set(),
    };

    const selectorResult = getViewItems(initialState);

    expect(selectorResult).toEqual(expectedResult);
  });
});
