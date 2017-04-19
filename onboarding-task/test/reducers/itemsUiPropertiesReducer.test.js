import { itParam } from 'mocha-param';
import { Map } from 'immutable';
import {
  ITEM_TOGGLE_EDIT,
  POST_ITEM_SUCCESS,
  PUT_ITEM_SUCCESS,
  DELETE_ITEM_SUCCESS,
} from '../../src/actions/actionTypes.ts';
import {
  toggleEditItem,
} from '../../src/actions/actionCreatorsItems.ts';
import {
  postItemSuccess,
} from '../../src/actions/actionFactories/actionFactoryPost.ts';
import {
  putItemSuccess,
} from '../../src/actions/actionFactories/actionFactoryPut.ts';
import {
  deleteItemSuccess,
} from '../../src/actions/actionFactories/actionFactoryDelete.ts';
import { itemsUiPropertiesReducer } from '../../src/reducers/itemsReducers/itemsUiPropertiesReducer.ts';

describe('itemsUiPropertiesReducer:', () => {
  const id = 'testId';
  const item = {
    id,
    text: 'text 1',
  };
  const toggleParams = [false, true];

  it(`should return Map with new item when state undefined on ${POST_ITEM_SUCCESS}`, () => {
    const result = itemsUiPropertiesReducer(undefined, postItemSuccess(item));

    expect(result.size).toBe(1);
  });

  it('should return original state on unknown action', () => {
    const state = new Map({
      [id]: { editFormVisible: false },
    });
    const result = itemsUiPropertiesReducer(state, { type: 'unknown' });

    expect(result).toEqual(state);
  });

  it(`should add new item to state on action ${POST_ITEM_SUCCESS}`, () => {
    const state = new Map({
      'otherId': { editFormVisible: false },
    });
    const result = itemsUiPropertiesReducer(state, postItemSuccess(item));

    expect(result.size).toBe(2);
  });

  it(`should create new item with editFormVisible set to false on ${POST_ITEM_SUCCESS}`, () => {
    const result = itemsUiPropertiesReducer(undefined, postItemSuccess(item));

    expect(result.get(id).editFormVisible).toBeFalsy();
  });

  itParam(`should toggle editFormVisible on action ${PUT_ITEM_SUCCESS}`, toggleParams, (visible) => {
    const state = new Map({
      [id]: { editFormVisible: visible },
    });
    const result = itemsUiPropertiesReducer(state, putItemSuccess(item));

    expect(result.get(id).editFormVisible).toBeFalsy();
  });

  itParam(`should toggle editFormVisible on action ${ITEM_TOGGLE_EDIT}`, toggleParams, (visible) => {
    const state = new Map({
      [id]: { editFormVisible: visible },
    });
    const result = itemsUiPropertiesReducer(state, toggleEditItem(id));

    expect(result.get(id).editFormVisible).toBe(!visible);
  });

  it(`should delete item on action ${DELETE_ITEM_SUCCESS}`, () => {
    const state = new Map({
      [id]: { editFormVisible: false },
    });
    const result = itemsUiPropertiesReducer(state, deleteItemSuccess(id));

    expect(result.size).toBe(0);
  });

  it(`should be the same when id does not exist on ${DELETE_ITEM_SUCCESS}`, () => {
    const state = new Map({
      [id]: { editFormVisible: false },
    });
    const result = itemsUiPropertiesReducer(state, deleteItemSuccess('otherId'));

    expect(result).toEqual(state);
  });
});
