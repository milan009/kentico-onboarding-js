import { ADD_ITEM_TO_LIST, DELETE_ITEM_FROM_LIST, UPDATE_ITEM, SWITCH_FORM_VISIBILITY_FOR_ITEM } from '../../src/constants/actionTypes';
import { createListItemFactory, switchFormVisibilityForListItem, updateListItem, deleteListItem } from '../../src/actionCreators/actionCreators';

describe('action creators ', () => {
  const id = 'test-id';
  const text = 'Testing...';

  it('createListItem creates ' + ADD_ITEM_TO_LIST + ' action', () => {
    const actualAction = createListItemFactory(() => id)(text);
    const expectedAction = { type: ADD_ITEM_TO_LIST, payload: { text, id } };
    expect(actualAction).toEqual(expectedAction);
  });

  it('switchFormVisibilityForListItem creates ' + SWITCH_FORM_VISIBILITY_FOR_ITEM + 'action', () => {
    const actualAction = switchFormVisibilityForListItem(id);
    const expectedAction = { type: SWITCH_FORM_VISIBILITY_FOR_ITEM, payload: { id } };
    expect(actualAction).toEqual(expectedAction);
  });

  it('updateListItem creates ' + UPDATE_ITEM + ' action', () => {
    const actualAction = updateListItem(id, text);
    const expectedAction = { type: UPDATE_ITEM, payload: { id, text } };
    expect(actualAction).toEqual(expectedAction);
  });

  it('deleteListItem creates ' + DELETE_ITEM_FROM_LIST + ' action', () => {
    const actualAction = deleteListItem(id);
    const expectedAction = { type: DELETE_ITEM_FROM_LIST, payload: { id } };
    expect(actualAction).toEqual(expectedAction);
  });
});
