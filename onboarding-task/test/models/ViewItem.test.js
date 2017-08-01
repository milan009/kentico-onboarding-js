import { ViewItem } from '../../src/models/ViewItem';

describe('View item memization tests', () => {
  it('creates correct ViewItem object', () => {
    const mockId = '12345678-0000-0000-0000-000000000000';
    const mockDataObject = { text: 'Mlock' };
    const mockFlagsObject = { isBeingEdited: false };
    const expectedViewItem = {
      id: mockId,
      index: 2,
      text: 'Mlock',
      isBeingEdited: false,
    };

    const createdViewItem = ViewItem(mockId, 2, mockDataObject, mockFlagsObject);

    expect(createdViewItem).toEqual(expectedViewItem);
  });

  it('multiple calls with same parameters return same reference', () => {
    const mockId = '12345678-0000-0000-0000-000000000000';
    const mockDataObject = { text: 'Mlock' };
    const mockFlagsObject = { isBeingEdited: false };

    const firstViewItem = new ViewItem(mockId, 2, mockDataObject, mockFlagsObject);
    const secondViewItem = new ViewItem(mockId, 2, mockDataObject, mockFlagsObject);

    expect(firstViewItem).toBe(secondViewItem);
  });
});
