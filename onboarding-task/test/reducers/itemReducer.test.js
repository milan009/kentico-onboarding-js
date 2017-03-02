import { ItemRecord } from '../../src/models/ItemRecord';
import { itemReducer } from '../../src/reducers/itemReducer';
import {
  switchFormVisibilityForListItem,
  updateListItem,
} from '../../src/actionCreators/actionCreators';
import {
  SWITCH_FORM_VISIBILITY_FOR_ITEM,
  UPDATE_TEXT_OF_ITEM,
} from '../../src/constants/actionTypes';

describe('itemReducer ', () => {
  const id = 'test-id';
  const text = 'Testing...';

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
