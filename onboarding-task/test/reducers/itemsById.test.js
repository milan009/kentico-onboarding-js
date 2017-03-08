import { itemsById } from '../../src/reducers/itemsById';
import * as actions from '../../src/actions/actionCreators';
import * as Immutable from 'immutable';
import { ItemRecord } from '../../src/utils/itemRecord';
import { addItemFactory } from '../../src/actions/actionDependencies/addItemFactory';

describe('itemsById reducer', () => {
  const UNKNOWN_ACTION = 'uknown action';
  const firstItem = new ItemRecord({ guid: '00000', text: 'serus', isEdited: false });
  const secondItem = new ItemRecord({ guid: '11111', text: 'soj', isEdited: false });
  const thirdItem = new ItemRecord({ guid: '22222', text: 'nazdar', isEdited: false });
  const stateBefore = Immutable.Map({
    [firstItem.guid]: firstItem,
    [secondItem.guid]: secondItem,
    [thirdItem.guid]: thirdItem,
  });
  const addItemAction = addItemFactory(() => '00000')('text');
  const deleteItemAction = actions.deleteItem('00000');
  const updateItemAction = actions.updateItemText('00000', 'new text');


  it('should return the initial state if action is uknown or not provided', () => {
    const actualState = itemsById(stateBefore, UNKNOWN_ACTION);

    expect(actualState).toEqual(stateBefore);
  });

  it('should return empty immutable map if no state is provided', () => {
    const actualState = itemsById(undefined, UNKNOWN_ACTION);

    expect(actualState).toEqual(Immutable.Map());
  });

  it('should handle ADD_ITEM action', () => {
    const addedItem = new ItemRecord({
      guid: '00000',
      text: 'text',
    });
    const expectedState = stateBefore.set('00000', addedItem);
    const actualState = itemsById(stateBefore, addItemAction);

    expect(actualState).toEqual(expectedState);
  });

  it('should handle DELETE_ITEM action', () => {
    const expectedState = stateBefore.delete('00000');
    const actualState = itemsById(stateBefore, deleteItemAction);

    expect(actualState).toEqual(expectedState);
  });

  it('should handle UPDATE_ITEM_TEXT action', () => {
    const expectedState = stateBefore.setIn(['00000', 'text'], 'new text');
    const actualState = itemsById(stateBefore, updateItemAction);

    expect(actualState).toEqual(expectedState);
  });
});

