import {
  createItem,
  updateItem,
} from '../../src/actions/actionCreators.ts';
import { createItemFactory } from '../../src/actions/createItemFactory.ts';
import { Item } from '../../src/models/Item.ts';
import { itemReducer } from '../../src/reducers/itemsReducers/itemReducer.ts';

describe('itemReducer:', () => {
  const id = 'TestId';
  const text = 'TestText';

  it('returns previous state for unknown action', () => {
    const prevState = new Item({
      id,
      text,
    });
    const resultState = itemReducer(prevState, { type: 'unknown' });

    expect(resultState).toEqual(prevState);
  });

  it('returns default item for undefined state', () => {
    const expectedState = new Item();
    const resultState = itemReducer(undefined, { type: 'unknown' });

    expect(resultState).toEqual(expectedState);
  });

  it('creates item with correct id and text using createItemFactory', () => {
    const expectedState = new Item({ id, text });
    const resultState = itemReducer(undefined, createItemFactory(() => id)(text));

    expect(resultState).toEqual(expectedState);
  });

  it('generates id and set correct test using createItem', () => {
    const notExpectedId = new Item().id;
    const result = itemReducer(undefined, createItem(text));

    expect(result.text).toBe(text);
    expect(result.id).not.toBe(notExpectedId);
  });

  it('updates item text correctly using updateItem creator', () => {
    const newText = 'changed text';
    const expectedState = new Item({
      id,
      text: newText,
    });
    const resultState = itemReducer(new Item({ id, text }), updateItem(id, newText));

    expect(resultState).toEqual(expectedState);
  });
});
