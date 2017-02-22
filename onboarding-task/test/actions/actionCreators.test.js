/**
 * Created by IvanJ on 21.2.2017.
 */
import { generateGuid } from '../../src/utils/generateGuid.js';
import * as actions from '../../src/actions/actionCreators';
import * as types from '../../src/actions/actionTypes';

describe('actionCreators', () => {
  const text = 'New item'
  it('should create action to add item', () => {
    const expectedAction = {
      type: types.ADD_ITEM,
      payload: {
        guid: generateGuid(),
        isEdited: false,
        text,
      },
    };
    const action = actions.addItem(text);

    expect(action.type).toBe(expectedAction.type);
    expect(action.payload.isEdited).toBe(expectedAction.payload.isEdited);
    expect(action.payload.text).toBe(expectedAction.payload.text);
    expect(action.payload.guid).not.toBe(null);
  });

  it('should create action for toggling edit mode', () => {
    const expectedAction = {
      type: types.TOGGLE_EDIT_MODE,
      payload: {
        guid: '00000',
      },
    };
    const action = actions.toggleEditMode('00000');

    expect(action.type).toBe(expectedAction.type);
    expect(action.payload.guid).toBe(expectedAction.payload.guid);
  });

  it('should create action for deleting item', () => {
    const expectedAction = {
      type: types.DELETE_ITEM,
      payload: {
        guid: '00000',
      },
    };
    const action = actions.deleteItem('00000');

    expect(action.type).toBe(expectedAction.type);
    expect(action.payload.guid).toBe(expectedAction.payload.guid);
  });

  it('should create action for updating item', () => {
    const expectedAction = {
      type: types.UPDATE_ITEM,
      payload: {
        guid: '00000',
        text,
      },
    };
    const action = actions.updateItem('00000', 'new text');

    expect(action.type).toBe(expectedAction.type);
    expect(action.payload.guid).toBe(expectedAction.payload.guid);
    expect(action.payload.text).toBe('new text');
  });
});
