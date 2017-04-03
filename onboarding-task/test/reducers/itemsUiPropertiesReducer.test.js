import { itParam } from 'mocha-param';
import { Map } from 'immutable';
import { createItemFactory } from '../../src/actions/createItemFactory.ts';
import { ItemUi } from '../../src/types/ItemUi.ts';
import {
  ITEM_CREATE,
  ITEM_DELETE,
  ITEM_UPDATE,
  ITEM_TOGGLE_EDIT,
} from '../../src/actions/actionTypes.ts';
import {
  createItem,
  updateItem,
  deleteItem,
  toggleEditItem,
} from '../../src/actions/actionCreators.ts';
import { itemsUiPropertiesReducer } from '../../src/reducers/itemsReducers/itemsUiPropertiesReducer.ts';

describe('itemsUiPropertiesReducer:', () => {
  const id = 'testId';
  const toggleParams = [false, true];

  it('should return Map with new item when state undefined', () => {
    const result = itemsUiPropertiesReducer(undefined, createItem('text'));

    expect(result.size).toBe(1);
  });

  it('should return original state on unknown action', () => {
    const state = new Map({
      [id]: { editFormVisible: false },
    });
    const result = itemsUiPropertiesReducer(state, { type: 'unknown' });

    expect(result).toEqual(state);
  });

  it(`should add new item to state on action ${ITEM_CREATE}`, () => {
    const state = new Map({
      [id]: { editFormVisible: false },
    });
    const result = itemsUiPropertiesReducer(state, createItem('text'));

    expect(result.size).toBe(2);
  });

  it(`should create new item with editFormVisible set to false on ${ITEM_CREATE}`, () => {
    const result = itemsUiPropertiesReducer(undefined, createItemFactory(() => id)('text'));

    expect(result.get(id).editFormVisible).toBeFalsy();
  });

  itParam(`should toggle editFormVisible on action ${ITEM_UPDATE}`, toggleParams, (visible) => {
    const state = new Map({
      [id]: { editFormVisible: visible },
    });
    const result = itemsUiPropertiesReducer(state, updateItem(id, 'new text'));

    expect(result.get(id).editFormVisible).toBe(!visible);
  });

  itParam(`should toggle editFormVisible on action ${ITEM_TOGGLE_EDIT}`, toggleParams, (visible) => {
    const state = new Map({
      [id]: { editFormVisible: visible },
    });
    const result = itemsUiPropertiesReducer(state, toggleEditItem(id));

    expect(result.get(id).editFormVisible).toBe(!visible);
  });

  it(`should delete item on action ${ITEM_DELETE}`, () => {
    const state = new Map({
      [id]: { editFormVisible: false },
    });
    const result = itemsUiPropertiesReducer(state, deleteItem(id));

    expect(result.size).toBe(0);
  });

  it(`should be the same when id does not exist on ${ITEM_DELETE}`, () => {
    const state = new Map({
      [id]: { editFormVisible: false },
    });
    const result = itemsUiPropertiesReducer(state, deleteItem('otherId'));

    expect(result).toEqual(state);
  });
});
