import { CREATE_ITEM_IN_LIST, DELETE_ITEM_FROM_LIST, UPDATE_TEXT_OF_ITEM, SWITCH_FORM_VISIBILITY_FOR_ITEM } from '../../src/constants/actionTypes.ts';
import { switchFormVisibilityForListItem, updateListItem, deleteListItem } from '../../src/actionCreators/actionCreators.ts';
import { createListItemFactory } from '../../src/actionCreators/createListItemFactory.ts';

describe('action creators ', () => {
  const id = 'test-id';
  const text = 'Testing...';

  it(`createListItem creates ${CREATE_ITEM_IN_LIST} action`, () => {
    const expectedAction = { type: CREATE_ITEM_IN_LIST, payload: { text, id } };
    const expectedItemToSend = { id: '', value: text, ueid: id };
    const fakeDispatch = jest.fn(action => action);

    const actualAction = createListItemFactory(() => id, action => action)(text)(fakeDispatch);
    expect(fakeDispatch.mock.calls.length).toEqual(2);
    expect(fakeDispatch.mock.calls[0][0]).toEqual(expectedAction);
    expect(actualAction).toEqual(expectedItemToSend);
  });

  it(`switchFormVisibilityForListItem creates ${SWITCH_FORM_VISIBILITY_FOR_ITEM} action`, () => {
    const actualAction = switchFormVisibilityForListItem(id);
    const expectedAction = { type: SWITCH_FORM_VISIBILITY_FOR_ITEM, payload: { id } };

    expect(actualAction).toEqual(expectedAction);
  });

  it(`updateListItem creates ${UPDATE_TEXT_OF_ITEM} action`, () => {
    const actualAction = updateListItem(id, text);
    const expectedAction = { type: UPDATE_TEXT_OF_ITEM, payload: { id, text } };

    expect(actualAction).toEqual(expectedAction);
  });

  it(`deleteListItem creates ${DELETE_ITEM_FROM_LIST} action`, () => {
    const actualAction = deleteListItem(id);
    const expectedAction = { type: DELETE_ITEM_FROM_LIST, payload: { id } };

    expect(actualAction).toEqual(expectedAction);
  });
});
