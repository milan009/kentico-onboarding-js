import { itemsFlags } from '../../src/reducers/itemsFlags';
import * as actions from '../../src/actions/actionCreators';
import Immutable from 'immutable';
import { addItemFactory } from '../../src/actions/actionDependencies/addItemFactory';

describe('itemsFlags reducer', () => {
  const UNKNOWN_ACTION = 'uknown action';
  const firstItem = { isEdited: false };
  const secondItem = { isEdited: true };
  const thirdItem = { isEdited: false };
  const stateBefore = Immutable.Map({
    '00000': firstItem,
    '11111': secondItem,
    '22222': thirdItem,
  });
  const addItemAction = addItemFactory(() => '12345')('text');
  const deleteItemAction = actions.deleteItem('00000');
  const toggleEditModeAction = actions.toggleEditMode('00000');
  const updateItemAction = actions.updateItemText('00000', 'new text');

  it('should return empty list if action is uknown or not provided', () => {
    const actualState = itemsFlags(stateBefore, UNKNOWN_ACTION);

    expect(actualState).toEqual(stateBefore);
  });

  it('should return empty immutable list if no state is provided', () => {
    const actualState = itemsFlags(undefined, UNKNOWN_ACTION);

    expect(actualState).toEqual(Immutable.Map());
  });

  it('should handle ADD_ITEM action', () => {
    const expectedState = stateBefore.set('12345', false);
    const actualState = itemsFlags(stateBefore, addItemAction);

    expect(actualState).toEqual(expectedState);
  });

  it('should handle DELETE_ITEM action', () => {
    const expectedState = stateBefore.delete('00000')
    const actualState = itemsFlags(stateBefore, deleteItemAction);

    expect(actualState).toEqual(expectedState);
  });

  it('should handle TOGGLE_EDIT_MODE action', () => {
    const expectedState = stateBefore.set('00000', { 'isEdited': true });
    const actualState = itemsFlags(stateBefore, toggleEditModeAction);

    expect(actualState).toEqual(expectedState);
  });

  it('should handle UPDATE_ITEM_TEXT action', () => {
    const expectedState = stateBefore.set('00000', { 'isEdited': true });
    const actualState = itemsFlags(stateBefore, updateItemAction);

    expect(actualState).toEqual(expectedState);
  });
});

