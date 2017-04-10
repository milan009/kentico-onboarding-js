import { selectViewItem } from '../../src/selectors/selectViewItem.ts';
import { ViewItem } from '../../src/viewModels/ViewItem.ts';
import { Item } from '../../src/models/Item.ts';

describe('selectViewItem', () => {
  const testId = '0aeeaa2b-1a2a-482c-b2a6-b172109071e7';
  const testText = 'test text';

  it('should return true flag if item is edited', () => {
    const expectedResult = new ViewItem({ id: testId, text: testText, isEdited: true, index: 1 });
    const testItem = new Item({ id: testId, text: testText });
    const isEdited = true;

    const selectorResult = selectViewItem(testItem, isEdited, 0);

    expect(selectorResult).toEqual(expectedResult);
  });

  it('should return false flag if item is not edited', () => {
    const expectedResult = new ViewItem({ id: testId, text: testText, isEdited: false, index: 1 });
    const testItem = new Item({ id: testId, text: testText });
    const isEdited = false;

    const selectorResult = selectViewItem(testItem, isEdited, 0);

    expect(selectorResult).toEqual(expectedResult);
  });
});
