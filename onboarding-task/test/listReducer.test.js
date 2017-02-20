import { OrderedMap } from 'immutable';
import { list } from '../src/reducers/listReducer.js';
import { addItemFunctionCreator, deleteItem, updateItem } from '../src/actions/itemActionCreators.js';
import { Item } from '../src/models/ItemModel.js';

describe('List reducer', () => {
  const firstTestId = '0aeeaa2b-1a2a-482c-b2a6-b172109071e7';
  const addItem = addItemFunctionCreator(() => firstTestId);

  it('should return initial state', () => {
    expect(list(undefined, {})).toEqual(OrderedMap());
  });

  it('should handle add item', () => {
    let mockList = OrderedMap();
    let testList = OrderedMap();
    const secondTestId = '70e9ad48-e190-4578-8939-f9afa5b51501';
    const addSecondItem = addItemFunctionCreator(() => secondTestId);

    mockList = mockList.set(firstTestId, Item({ id: firstTestId, text: 'first add test' }));
    testList = list(testList, addItem('first add test'));
    expect(testList)
      .toEqual(mockList);

    mockList = mockList.set(secondTestId, Item({ id: secondTestId, text: 'second add test' }));
    testList = list(testList, addSecondItem('second add test'))
    expect(testList)
      .toEqual(mockList);
  });

  it('should handle delete item', () => {
    const mockList = OrderedMap();
    let testList = OrderedMap();

    testList = testList.set(firstTestId, Item({ id: firstTestId, text: 'first add test' }));
    expect(list(testList, deleteItem(firstTestId))).toEqual(mockList);
  });

  it('should handle update item', () => {
    let mockList = OrderedMap();
    let testList = OrderedMap();

    mockList = mockList.set(firstTestId, Item({ id: firstTestId, text: 'updated text' }));
    testList = testList.set(firstTestId, Item({ id: firstTestId, text: 'first add test' }));

    expect(list(testList, updateItem(firstTestId, 'updated text'))).toEqual(mockList);
  });
});
