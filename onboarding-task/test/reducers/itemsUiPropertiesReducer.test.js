import {
  ITEM_CREATE,
  ITEM_DELETE,
  ITEM_UPDATE,
  ITEM_TOGGLE_EDIT,
} from '../../src/actions/actionTypes.js';
import {
  createItem,
  updateItem,
  deleteItem,
  toggleEditItem,
} from '../../src/actions/actionCreators.js';
import { createItemFactory } from '../../src/actions/createItemFactory.js';
import { Map } from 'immutable';
import { ItemUi } from '../../src/models/ItemUi.js';
import { itemsUiPropertiesReducer } from '../../src/reducers/itemsReducers/itemsUiPropertiesReducer.js';

describe('itemsUiPropertiesReducer:', () => {
  const id = 'testId';

  it('should return Map with new item when state undefined', () => {
    const result = itemsUiPropertiesReducer(undefined, createItem('text'));

    expect(result.size).toBe(1);
  });

  it('should return original state on unknown action', () => {
    const state = new Map({
      [id]: new ItemUi(),
    });
    const result = itemsUiPropertiesReducer(state, { type: 'unknown' });

    expect(result).toEqual(state);
  });

  it(`should add new item to state on action ${ITEM_CREATE}`, () => {
    const state = new Map({
      [id]: new ItemUi(),
    });
    const result = itemsUiPropertiesReducer(state, createItem('text'));

    expect(result.size).toBe(2);
  });

  it(`should create new item with editFormVisible set to false on ${ITEM_CREATE}`, () => {
    const result = itemsUiPropertiesReducer(undefined, createItemFactory(() => id)('text'));

    expect(result.get(id).editFormVisible).toBeFalsy();
  });

  it(`should toggle editFormVisible on action ${ITEM_UPDATE} (false -> true)`, () => {
    const state = new Map({
      [id]: new ItemUi({ editFormVisible: false }),
    });
    const result = itemsUiPropertiesReducer(state, updateItem(id, 'new text'));

    expect(result.get(id).editFormVisible).toBeTruthy();
  });

  it(`should toggle editFormVisible on action ${ITEM_UPDATE} (true -> false)`, () => {
    const state = new Map({
      [id]: new ItemUi({ editFormVisible: true }),
    });
    const result = itemsUiPropertiesReducer(state, updateItem(id, 'new text'));

    expect(result.get(id).editFormVisible).toBeFalsy();
  });

  it(`should toggle editFormVisible on action ${ITEM_TOGGLE_EDIT} (false -> true)`, () => {
    const state = new Map({
      [id]: new ItemUi({ editFormVisible: false }),
    });
    const result = itemsUiPropertiesReducer(state, toggleEditItem(id));

    expect(result.get(id).editFormVisible).toBeTruthy();
  });

  it(`should toggle editFormVisible on action ${ITEM_TOGGLE_EDIT} (true -> false)`, () => {
    const state = new Map({
      [id]: new ItemUi({ editFormVisible: true }),
    });
    const result = itemsUiPropertiesReducer(state, toggleEditItem(id));

    expect(result.get(id).editFormVisible).toBeFalsy();
  });

  it(`should delete item on action ${ITEM_DELETE}`, () => {
    const state = new Map({
      [id]: new ItemUi(),
    });
    const result = itemsUiPropertiesReducer(state, deleteItem(id));

    expect(result.size).toBe(0);
  });

  it(`should be the same when id does not exist on ${ITEM_DELETE}`, () => {
    const state = new Map({
      [id]: new ItemUi(),
    });
    const result = itemsUiPropertiesReducer(state, deleteItem('otherId'));

    expect(result).toEqual(state);
  });
});
