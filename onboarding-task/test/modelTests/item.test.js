import { Item } from '../../src/models/Item.ts';
import { itemViewModel } from '../../src/models/itemViewModel.ts';

describe('Correctly creates items: ', () => {
  const fakeId = '23456899-df58-1bbf-1j8p-4asd582z69d8';
  it('Converts Items to Objects', () => {
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

  it('Works the with() method correctly', () => {
    const expected = new Item({
      id: fakeId,
      text: 'text is changed',
      isEdited: false,
    });
    const item = new Item({
      id: fakeId,
      text: 'text',
      isEdited: true,
    });

    const tested = item.with(expected);

    expect(tested).toEqual(expected);
  });

  it('Creates a correct itemViewModel', () => {
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
