import { OrderedMap } from 'immutable';
import { list } from '../../src/reducers/listReducer.js';
import { deleteItem, updateItem } from '../../src/actions/listActionCreators.js';
import { addItemFactory } from '../../src/actions/addItemFactory.js';
import { Item } from '../../src/models/ItemModel.js';

describe('List reducer', () => {
  const firstTestId = '0aeeaa2b-1a2a-482c-b2a6-b172109071e7';
  const addItem = addItemFactory(() => firstTestId);

  it('should return initial state', () => {
    expect(list(undefined, {})).toEqual(OrderedMap());
  });

  it('should handle add item', () => {
    const secondTestId = '70e9ad48-e190-4578-8939-f9afa5b51501';
    const addSecondItem = addItemFactory(() => secondTestId);
    const expectedList = OrderedMap({ [firstTestId]: Item({ id: firstTestId, text: 'first add test' }),
      [secondTestId]: Item({ id: secondTestId, text: 'second add test' }) });
    const listBefore = OrderedMap();

    let listAfter = list(listBefore, addItem('first add test'));
    listAfter = list(listAfter, addSecondItem('second add test'));

    expect(listAfter).toEqual(expectedList);
  });

  it('should handle delete item', () => {
    const expectedList = OrderedMap();
    const listBefore = OrderedMap({ [firstTestId]: Item({ id: firstTestId, text: 'first add test' }) });

    const listAfter = list(listBefore, deleteItem(firstTestId));

    expect(listAfter).toEqual(expectedList);
  });

  it('should handle update item', () => {
    const expectedList = OrderedMap({ [firstTestId]: Item({ id: firstTestId, text: 'updated text' }) });
    const listBefore = OrderedMap({ [firstTestId]: Item({ id: firstTestId, text: 'first add test' })});

    const listAfter = list(listBefore, updateItem(firstTestId, 'updated text'));

    expect(listAfter).toEqual(expectedList);
  });
});
