/**
 * Created by IvanJ on 21.2.2017.
 */
import items from '../../src/reducers/items';
import * as actions from '../../src/actions/actionCreators';
import Immutable from 'immutable';
import { itemRecord } from '../../src/utils/itemRecord';

function getInitialState() {
  const firstItem = itemRecord({ guid: '00000', text: 'serus', isEdited: false });
  const secondItem = itemRecord({ guid: '11111', text: 'soj', isEdited: false });
  const thirdItem = itemRecord({ guid: '22222', text: 'nazdar', isEdited: false });

  return {
    items: Immutable.Map({
      [firstItem.get('guid')]: firstItem,
      [secondItem.get('guid')]: secondItem,
      [thirdItem.get('guid')]: thirdItem,
    }),
  };
}

const addItemAction = actions.addItem('text');
const toggleEditModeAction = actions.toggleEditMode('00000');
const deleteItemAction = actions.deleteItem('00000');
const updateItemAction = actions.updateItem('00000', 'new text');
const initialState = getInitialState().items;


describe('itemd reducer', () => {
  it('should return the initial state', () => {
    expect(items(initialState, {})).toEqual(initialState);
  });

  it('should handle ADD_ITEM action', () => {
    const addedItem = itemRecord({
      guid: addItemAction.payload.guid,
      text: 'text',
      isEdited: false,
    });
    const expectedState = getInitialState().items.set(addItemAction.payload.guid, addedItem);

    expect(items(initialState, addItemAction)).toEqual(expectedState);
  });

  it('should handle TOGGLE_EDIT_MODE action', () => {
    const toggledItem = getInitialState().items.get(toggleEditModeAction.payload.guid).set('isEdited', true);
    const expectedState = getInitialState().items.set(toggleEditModeAction.payload.guid, toggledItem);
    expect(items(initialState, toggleEditModeAction)).toEqual(expectedState);
  });

  it('should handle DELETE_ITEM action', () => {
    const expectedState = initialState.delete(deleteItemAction.payload.guid);
    expect(items(initialState, deleteItemAction)).toEqual(expectedState);
  });

  it('should handle UPDATE_ITEM action', () => {
    const updateItem = getInitialState().items.get(updateItemAction.payload.guid).set('text', 'new text');
    const expectedState = getInitialState().items.set(updateItemAction.payload.guid, updateItem);

    expect(items(initialState, updateItemAction)).toEqual(expectedState);
  });

});

