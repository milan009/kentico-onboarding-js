import { Item } from '../../src/models/Item';
import { itemViewModel } from '../../src/models/itemViewModel';

describe('Correctly creates items: ', () => {
  const fakeId = '23456899-df58-1bbf-1j8p-4asd582z69d8';
  it('Creates items', () => {
    const expected = {
      id: fakeId,
      text: 'text',
      isEdited: false,
    };

    const item = new Item({
      id: fakeId,
      text: 'text',
      isEdited: false,
    });
    const tested = item.toObject();

    expect(tested).toEqual(expected);
  });
  it('Creates correct itemViewModel', () => {
    const item = new Item({
      id: fakeId,
      text: 'text',
      isEdited: false,
    });
    const expected = {
      id: fakeId,
      text: 'text',
      isEdited: false,
      index: 2,
    };

    const tested = itemViewModel(item, 2);

    expect(tested).toEqual(expected);
  });
});
