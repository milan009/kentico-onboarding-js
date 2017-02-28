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
    const prevState = new ItemRecord({ id, text, formDisplayed: true });
    const expectedState = new ItemRecord({ id, text: 'test', formDisplayed: true });
    const nextState = itemReducer(prevState, updateListItem(id, 'test'));

    expect(nextState).toEqual(expectedState);
  });

  it(`returns item with formDisplayed switched from true to false when ${SWITCH_FORM_VISIBILITY_FOR_ITEM} action is dispatched`, () => {
    const prevState = new ItemRecord({ id, text, formDisplayed: true });
    const expectedState = new ItemRecord({ id, text, formDisplayed: false });
    const nextState = itemReducer(prevState, switchFormVisibilityForListItem(id));

    expect(nextState).toEqual(expectedState);
  });

  it(`returns item with formDisplayed switched from false to true when ${SWITCH_FORM_VISIBILITY_FOR_ITEM} action is dispatched`, () => {
    const prevState = new ItemRecord({ id, text, formDisplayed: false });
    const expectedState = new ItemRecord({ id, text, formDisplayed: true });
    const nextState = itemReducer(prevState, switchFormVisibilityForListItem(id));

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
