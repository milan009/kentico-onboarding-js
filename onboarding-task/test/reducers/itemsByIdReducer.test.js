import { Map } from 'immutable';
import { Item } from '../../src/models/Item.js';
import {
  ITEM_CREATE,
  ITEM_DELETE,
  ITEM_UPDATE,
} from '../../src/actions/actionTypes.js';
import {
  createItem,
  updateItem,
  deleteItem,
} from '../../src/actions/actionCreators.js';
import { itemsByIdReducer } from '../../src/reducers/itemsReducers/itemsByIdReducer';

describe('itemsByIdReducer:', () => {
  const id = 'testId';

  it('should return Map with new item when state undefined', () => {
    const result = itemsByIdReducer(undefined, createItem('text'));

    expect(result.size).toBe(1);
  });

  it('should return original state on unknown action', () => {
    const state = new Map({
      [id]: new Item({
        id,
        text: 'text',
      }),
    });
    const result = itemsByIdReducer(state, { type: 'unknown' });

    expect(result).toEqual(state);
  });

  it(`should add new item to state on action ${ITEM_CREATE}`, () => {
    const state = new Map({
      [id]: new Item({
        id,
        text: 'text',
      }),
    });
    const result = itemsByIdReducer(state, createItem('text'));

    expect(result.size).toBe(2);
  });

  it(`should update text of item on action ${ITEM_UPDATE}`, () => {
    const state = new Map({
      [id]: new Item({
        id,
        text: 'text',
      }),
    });
    const newText = 'new test text';
    const result = itemsByIdReducer(state, updateItem(id, newText));

    expect(result.get(id).text).toBe(newText);
  });

  it(`should delete item on action ${ITEM_DELETE}`, () => {
    const state = new Map({
      [id]: new Item({
        id,
        text: 'text',
      }),
    });
    const result = itemsByIdReducer(state, deleteItem(id));

    expect(result.size).toBe(0);
  });

  it(`should be the same when id does not exist on ${ITEM_DELETE}`, () => {
    const state = new Map({
      [id]: new Item({
        id,
        text: 'text',
      }),
    });
    const result = itemsByIdReducer(state, deleteItem('otherId'));

    expect(result).toEqual(state);
  });
});
