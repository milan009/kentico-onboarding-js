import { item } from '../../src/reducers/item.ts';
import { ItemRecord } from '../../src/models/ItemRecord';
import * as actions from '../../src/actions/actionCreators.ts';
import { addItemFactory } from '../../src/actions/actionDependencies/addItemFactory.ts';

const initialState = new ItemRecord({
  guid: '00000',
  text: 'Redux rocks!',
  isEdited: false,
});

const UNKNOWN_ACTION = 'unknown action';

describe('item reducer', () => {
  it('should return the initial state', () => {
    const actualState = item(initialState, UNKNOWN_ACTION);

    expect(actualState).toEqual(initialState);
  });

  it('should return default item record', () => {
    const actualState = item(undefined, UNKNOWN_ACTION);

    expect(actualState).toEqual(new ItemRecord({}));
  });

  it('should handle ADD_ITEM action', () => {
    const addItemAction = addItemFactory(() => '00000')('new text');
    const actualState = item(initialState, addItemAction);
    const expectedState = new ItemRecord({
      text: 'new text',
      guid: '00000',
      isEdited: false,
    });

    expect(actualState).toEqual(expectedState);
  });

  it('should handle TOGGLE_EDIT_MODE action', () => {
    const toggleEditModeAction = actions.toggleEditMode('00000');

    const actualState = item(initialState, toggleEditModeAction);
    const expectedState = new ItemRecord({
      text: 'Redux rocks!',
      guid: '00000',
      isEdited: !initialState.isEdited,
    });

    expect(actualState).toEqual(expectedState);
  });

  it('should handle UPDATE_ITEM_TEXT action', () => {
    const updateItemAction = actions.updateItemText('00000', 'new text');
    const actualState = item(initialState, updateItemAction);
    const expectedState = new ItemRecord({
      text: 'new text',
      guid: '00000',
      isEdited: false,
    });

    expect(actualState).toEqual(expectedState);
  });
});
