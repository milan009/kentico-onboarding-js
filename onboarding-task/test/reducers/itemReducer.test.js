import { ItemRecord } from '../../src/models/ItemRecord';
import { itemReducer } from '../../src/reducers/itemsReducers/itemReducer';
import {
  updateListItem,
} from '../../src/actionCreators/actionCreators';
import { createListItemFactory } from '../../src/actionCreators/createListItemFactory';
import {
  CREATE_ITEM_IN_LIST,
  UPDATE_TEXT_OF_ITEM,
} from '../../src/constants/actionTypes';

describe('itemReducer ', () => {
  const id = 'test-id';
  const text = 'Testing...';

  it(`returns new ItemRecord when ${CREATE_ITEM_IN_LIST} action is dispatched`, () => {
    const expectedState = new ItemRecord({ id, text, formDisplayed: false });
    const createListItem = createListItemFactory(() => id);
    const nextState = itemReducer(undefined, createListItem(text));

    expect(nextState).toEqual(expectedState);
  });

  it(`returns item with updated text when ${UPDATE_TEXT_OF_ITEM} action is dispatched`, () => {
    const prevState = new ItemRecord({ id, text });
    const expectedState = new ItemRecord({ id, text: 'test' });
    const nextState = itemReducer(prevState, updateListItem(id, 'test'));

    expect(nextState).toEqual(expectedState);
  });

  it('does nothing when unknown action is dispatched', () => {
    const prevState = new ItemRecord({ id, text, formDisplayed: true });
    const nextState = itemReducer(prevState, { type: 'UNKNOWN_ACTION', payload: { id } });

    expect(nextState).toEqual(prevState);
  });

  it('returns default state when undefined state is passed in', () => {
    const expectedState = new ItemRecord();
    const nextState = itemReducer(undefined, {});

    expect(nextState).toEqual(expectedState);
  });
});
