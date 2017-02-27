import { OrderedMap } from 'immutable';
import { items } from '../../src/reducers/items.js';
import { deleteItem, updateItem } from '../../src/actions/itemsActionCreators.js';
import { addItemFactory } from '../../src/actions/addItemFactory.js';
import { Item } from '../../src/models/ItemModel.js';

describe('List reducer', () => {
  const firstTestId = '0aeeaa2b-1a2a-482c-b2a6-b172109071e7';
  const addItem = addItemFactory(() => firstTestId);

  it('should return initial state', () => {
    const expectedItems = OrderedMap();
    const itemsBefore = undefined;

    const itemsAfter = items(itemsBefore, { type: 'NOT_DEFINED' });

    expect(itemsAfter).toEqual(expectedItems);
  });

  it('should handle add item', () => {
    const secondTestId = '70e9ad48-e190-4578-8939-f9afa5b51501';
    const addSecondItem = addItemFactory(() => secondTestId);
    const expectedItems = OrderedMap({ [firstTestId]: Item({ id: firstTestId, text: 'first add test' }),
      [secondTestId]: Item({ id: secondTestId, text: 'second add test' }) });
    const itemsBefore = OrderedMap();

    let itemsAfter = items(itemsBefore, addItem('first add test'));
    itemsAfter = items(itemsAfter, addSecondItem('second add test'));

    expect(itemsAfter).toEqual(expectedItems);
  });

  it('should handle delete item', () => {
    const expectedItems = OrderedMap();
    const itemsBefore = OrderedMap({ [firstTestId]: Item({ id: firstTestId, text: 'first add test' }) });

    const itemsAfter = items(itemsBefore, deleteItem(firstTestId));

    expect(itemsAfter).toEqual(expectedItems);
  });

  it('should handle update item', () => {
    const expectedItems = OrderedMap({ [firstTestId]: Item({ id: firstTestId, text: 'updated text' }) });
    const itemsBefore = OrderedMap({ [firstTestId]: Item({ id: firstTestId, text: 'first add test' })});

    const itemsAfter = items(itemsBefore, updateItem(firstTestId, 'updated text'));

    expect(itemsAfter).toEqual(expectedItems);
  });
});
