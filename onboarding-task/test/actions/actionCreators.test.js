import * as actions from '../../src/actions/actionCreators';
import * as types from '../../src/actions/actionTypes';
import { addItemFactory } from '../../src/actions/actionDependencies/addItemFactory';

describe('actionCreators', () => {
  const text = 'New item';
  it('should create action to add item', () => {
    const expectedAction = {
      type: types.ADD_ITEM,
      payload: {
        guid: '00000',
        text,
      },
    };
    const actualAction = addItemFactory(() => '00000')(text);

    expect(actualAction).toEqual(expectedAction);
  });

  it('should create action for toggling edit mode', () => {
    const expectedAction = {
      type: types.TOGGLE_EDIT_MODE,
      payload: {
        guid: '00000',
      },
    };
    const actualAction = actions.toggleEditMode('00000');

    expect(actualAction).toEqual(expectedAction);
  });


  it('should create action for deleting item', () => {
    const expectedAction = {
      type: types.DELETE_ITEM,
      payload: {
        guid: '00000',
      },
    };
    const actualAction = actions.deleteItem('00000');

    expect(actualAction).toEqual(expectedAction);
  });

  it('should create action for updating item', () => {
    const expectedAction = {
      type: types.UPDATE_ITEM_TEXT,
      payload: {
        guid: '00000',
        text,
      },
    };
    const actualAction = actions.updateItemText('00000', text);

    expect(actualAction).toEqual(expectedAction);
  });
});
