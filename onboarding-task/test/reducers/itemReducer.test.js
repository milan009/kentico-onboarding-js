import {
  createItem,
  updateItem,
  toggleEditItem,
} from '../../src/actions/actionCreators.js';
import { createItemFactory } from '../../src/actions/itemCreateFactory.js';
import { Item } from '../../src/models/Item.js';
import { itemReducer } from '../../src/reducers/itemReducer.js';

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

  it('toggles editing correctly using toggleEditItem (false -> true)', () => {
    const state = new Item({ id, text });
    const result = itemReducer(state, toggleEditItem(id));

    expect(result.editing).toBe(true);
  });

  it('toggles editing correctly using toggleEditItem (true -> false)', () => {
    const state = new Item({ id, text, editing: true });
    const result = itemReducer(state, toggleEditItem(id));

    expect(result.editing).toBe(false);
  });
});
