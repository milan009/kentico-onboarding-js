/**
 * Created by IvanJ on 21.2.2017.
 */
import { generateGuid } from '../../src/utils/generateGuid.js';
import * as actions from '../../src/actions/actionCreators';
import * as types from '../../src/actions/actionTypes';

describe('actionCreators', () => {
  const text = 'New item';
  it('should create action to add item', () => {
    const expectedAction = {
      type: types.ADD_ITEM,
      payload: {
        guid: '00000',
        isEdited: false,
        text,
      },
    };
    const fakeAddItemAction = actions.addItemFactory(() => '00000')(text);
    expect(fakeAddItemAction).toEqual(expectedAction);
  });

  it('should create action for toggling edit mode', () => {
    const expectedAction = {
      type: types.TOGGLE_EDIT_MODE,
      payload: {
        guid: '00000',
      },
    };
    const action = actions.toggleEditMode('00000');
    expect(action).toEqual(expectedAction);
  });

  it('should create action for deleting item', () => {
    const expectedAction = {
      type: types.DELETE_ITEM,
      payload: {
        guid: '00000',
      },
    };
    const action = actions.deleteItem('00000');
    expect(action).toEqual(expectedAction);
  });

  it('should create action for updating item', () => {
    const expectedAction = {
      type: types.UPDATE_ITEM,
      payload: {
        guid: '00000',
        text,
      },
    };
    const action = actions.updateItem('00000', text);
    expect(action).toEqual(expectedAction);
  });
});
