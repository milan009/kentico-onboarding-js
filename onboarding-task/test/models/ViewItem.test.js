import { ViewItem } from '../../src/models/ViewItem.ts';
import * as testData from '../testUtils/testData';

describe('View item memoization tests', () => {
  it('creates correct ViewItem object', () => {
    const expectedViewItem = {
      id: testData.mockIds[0],
      index: 1,
      text: testData.mockTexts[0],
      isBeingEdited: testData.mockEditableFlags[0],
    };

    const createdViewItem = new ViewItem(1, testData.mockItemDataObjects[0], testData.mockItemFlagsObjects[0]);

    expect(createdViewItem).toEqual(expectedViewItem);
  });

  it('multiple calls with same parameters return same reference', () => {
    const firstViewItem = new ViewItem(1, testData.mockItemDataObjects[0], testData.mockItemFlagsObjects[0]);
    const secondViewItem = new ViewItem(1, testData.mockItemDataObjects[0], testData.mockItemFlagsObjects[0]);

    expect(firstViewItem).toBe(secondViewItem);
  });
});
