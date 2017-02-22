/**
 * Created by IvanJ on 21.2.2017.
 */
import item from '../../src/reducers/item';
import { itemRecord } from '../../src/utils/itemRecord';
import * as actions from '../../src/actions/actionCreators';


const initialState = itemRecord({
  guid: '00000',
  text: 'Redux rocks!',
  isEdited: false,
});

describe('item reducer', () => {
  it('should return the initial state', () => {
    expect(item(initialState, {})).toEqual(initialState);
  });

  it('should return default item record', () => {
    expect(item(undefined, {})).toEqual(itemRecord({}));
  });

  it('should handle ADD_ITEM action', () => {
    const addItemAction = actions.addItem('new text');
    expect(item(initialState, addItemAction)).toEqual(itemRecord({
      text: 'new text',
      guid: addItemAction.payload.guid,
      isEdited: false,
    }));
  });

  it('should handle TOGGLE_EDIT_MODE action', () => {
    const toggleEditModeAction = actions.toggleEditMode('00000');

    expect(item(initialState, toggleEditModeAction)).toEqual(itemRecord({
      text: 'Redux rocks!',
      guid: toggleEditModeAction.payload.guid,
      isEdited: !initialState.isEdited,
    }));
  });

  it('should handle UPDATE_ITEM action', () => {
    const updateItemAction = actions.updateItem('00000', 'new text');
    expect(item(initialState, updateItemAction)).toEqual(itemRecord({
      text: 'new text',
      guid: updateItemAction.payload.guid,
      isEdited: false,
    }));
  });
});
