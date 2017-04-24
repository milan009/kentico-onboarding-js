import { OrderedMap } from 'immutable';
import { Item } from '../../src/models/Item.ts';
import {
  POST_ITEM_SUCCESS,
  PUT_ITEM_SUCCESS,
  DELETE_ITEM_SUCCESS,
  GET_ITEMS_SUCCESS,
} from '../../src/actions/actionTypes.ts';
import { itemsByIdReducer } from '../../src/reducers/itemsReducers/itemsByIdReducer.ts';
import { postItemSuccess } from '../../src/actions/actionFactories/postActionFactory.ts';
import { putItemSuccess } from '../../src/actions/actionFactories/putActionFactory.ts';
import { deleteItemSuccess } from '../../src/actions/actionFactories/deleteActionFactory.ts';
import { getItemsSuccess } from '../../src/actions/actionFactories/getActionFactory.ts';

describe('itemsByIdReducer:', () => {
  const testItem = new Item({
    id: 'testId',
    text: 'text',
  });

  it('should return original state on unknown action', () => {
    const state = OrderedMap({
      [testItem.id]: testItem,
    });

    const result = itemsByIdReducer(state, { type: 'unknown' });

    expect(result).toEqual(state);
  });

  it(`should add new item to state on action ${POST_ITEM_SUCCESS}`, () => {
    const state = OrderedMap({
      [testItem.id]: testItem,
    });
    const newItem = {
      id: 'otherId',
      text: 'otherText',
    };

    const result = itemsByIdReducer(state, postItemSuccess(newItem));

    expect(result.size).toBe(2);
    expect(result.get(newItem.id).toJS()).toEqual(newItem);
  });

  it(`should update text of item on action ${PUT_ITEM_SUCCESS}`, () => {
    const state = OrderedMap({
      [testItem.id]: testItem,
    });
    const newItem = {
      id: testItem.id,
      text: 'otherText',
    };

    const result = itemsByIdReducer(state, putItemSuccess(newItem));

    expect(result.size).toBe(1);
    expect(result.get(newItem.id).toJS()).toEqual(newItem);
  });

  it(`should delete item on action ${DELETE_ITEM_SUCCESS}`, () => {
    const state = OrderedMap({
      [testItem.id]: testItem,
    });

    const result = itemsByIdReducer(state, deleteItemSuccess(testItem.id));

    expect(result.size).toBe(0);
  });

  it(`should be the same when id does not exist on ${DELETE_ITEM_SUCCESS}`, () => {
    const state = OrderedMap({
      [testItem.id]: testItem,
    });

    const result = itemsByIdReducer(state, deleteItemSuccess('otherId'));

    expect(result).toEqual(state);
  });

  it(`should populate items on ${GET_ITEMS_SUCCESS}`, () => {
    const receivedItems = [
      testItem, {
        id: 'otherId',
        text: 'text 2',
      }, {
        id: 'otherId 2',
        text: 'text 3',
      },
    ];
    const expected = OrderedMap(receivedItems.map(v => [v.id, v]));

    const result = itemsByIdReducer(undefined, getItemsSuccess(receivedItems));

    expect(result.toJSON()).toEqual(expected.toJSON());
  });

  it(`should replace current items on ${GET_ITEMS_SUCCESS}`, () => {
    const initialState = OrderedMap({
      [testItem.id]: testItem,
    });
    const receivedItems = [
      {
        id: 'otherId 1',
        text: 'text 1',
      }, {
        id: 'otherId 2',
        text: 'text 2',
      }, {
        id: 'otherId 3',
        text: 'text 3',
      },
    ];
    const expected = OrderedMap(receivedItems.map(v => [v.id, v]));

    const result = itemsByIdReducer(initialState, getItemsSuccess(receivedItems));

    expect(result.toJSON()).toEqual(expected.toJSON());
  });
});
