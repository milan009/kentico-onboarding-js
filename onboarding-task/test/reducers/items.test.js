import { items } from '../../src/reducers/items';
import * as actions from '../../src/actions/actionCreators';
import Immutable from 'immutable';
import { itemRecord } from '../../src/utils/itemRecord';
import { addItemFactory } from '../../src/actions/actionDependencies/addItemFactory';


describe('items reducer', () => {
  const UNKNOWN_ACTION = 'uknown action';
  const firstItem = new itemRecord({ guid: '00000', text: 'serus', isEdited: false });
  const secondItem = new itemRecord({ guid: '11111', text: 'soj', isEdited: false });
  const thirdItem = new itemRecord({ guid: '22222', text: 'nazdar', isEdited: false });
  const stateBefore = Immutable.Map({
    [firstItem.guid]: firstItem,
    [secondItem.guid]: secondItem,
    [thirdItem.guid]: thirdItem,
  });
  const addItemAction = addItemFactory(() => '00000')('text');
  const toggleEditModeAction = actions.toggleEditMode('00000');
  const deleteItemAction = actions.deleteItem('00000');
  const updateItemAction = actions.updateItem('00000', 'new text');


  it('should return the initial state if action is uknown or not provided', () => {
    expect(items(stateBefore, UNKNOWN_ACTION)).toEqual(stateBefore);
  });

  it('should return empty immutable map if no state is provided', () => {
    expect(items(undefined, UNKNOWN_ACTION)).toEqual(Immutable.Map());
  });

  it('should handle ADD_ITEM action', () => {
    const addedItem = new itemRecord({
      guid: '00000',
      text: 'text',
      isEdited: false,
    });
    const expectedState = stateBefore.set('00000', addedItem);
    expect(items(stateBefore, addItemAction)).toEqual(expectedState);
  });

  it('should handle TOGGLE_EDIT_MODE action', () => {
    const expectedState = stateBefore.setIn(['00000', 'isEdited'], true);
    expect(items(stateBefore, toggleEditModeAction)).toEqual(expectedState);
  });

  it('should handle DELETE_ITEM action', () => {
    const expectedState = stateBefore.delete('00000');
    expect(items(stateBefore, deleteItemAction)).toEqual(expectedState);
  });

  it('should handle UPDATE_ITEM action', () => {
    const expectedState = stateBefore.setIn(['00000', 'text'], 'new text');
    expect(items(stateBefore, updateItemAction)).toEqual(expectedState);
  });
});

