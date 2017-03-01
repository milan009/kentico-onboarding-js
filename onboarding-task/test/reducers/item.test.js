import { item } from '../../src/reducers/item';
import { itemRecord } from '../../src/utils/itemRecord';
import * as actions from '../../src/actions/actionCreators';
import { addItemFactory } from '../../src/actions/actionDependencies/addItemFactory';

const initialState = new itemRecord({
  guid: '00000',
  text: 'Redux rocks!',
  isEdited: false,
});

const UNKNOWN_ACTION = 'unknown action';

describe('item reducer', () => {
  it('should return the initial state', () => {
    expect(item(initialState, UNKNOWN_ACTION)).toEqual(initialState);
  });

  it('should return default item record', () => {
    expect(item(undefined, UNKNOWN_ACTION)).toEqual(itemRecord({}));
  });

  it('should handle ADD_ITEM action', () => {
    const addItemAction = addItemFactory(() => '00000')('new text');
    expect(item(initialState, addItemAction)).toEqual(itemRecord({
      text: 'new text',
      guid: '00000',
      isEdited: false,
    }));
  });

  it('should handle TOGGLE_EDIT_MODE action', () => {
    const toggleEditModeAction = actions.toggleEditMode('00000');

    expect(item(initialState, toggleEditModeAction)).toEqual(itemRecord({
      text: 'Redux rocks!',
      guid: '00000',
      isEdited: !initialState.isEdited,
    }));
  });

  it('should handle UPDATE_ITEM action', () => {
    const updateItemAction = actions.updateItem('00000', 'new text');
    expect(item(initialState, updateItemAction)).toEqual(itemRecord({
      text: 'new text',
      guid: '00000',
      isEdited: false,
    }));
  });
});
