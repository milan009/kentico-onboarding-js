import * as Immutable from 'immutable';
import { itemsById } from '../../src/reducers/itemsById.ts';
import * as actions from '../../src/actions/actionCreators.ts';
import { ItemRecord } from '../../src/models/ItemRecord.ts';

describe('itemsById reducer', () => {
  const UNKNOWN_ACTION = 'uknown action';
  const firstItem = new ItemRecord({ guid: '00000', text: 'serus' });
  const secondItem = new ItemRecord({ guid: '11111', text: 'soj' });
  const thirdItem = new ItemRecord({ guid: '22222', text: 'nazdar' });
  const stateBefore = Immutable.Map({
    [firstItem.guid]: firstItem,
    [secondItem.guid]: secondItem,
    [thirdItem.guid]: thirdItem,
  });
  const json = [
    {
      id: '00000',
      text: 'serus',
    },
    {
      id: '11111',
      text: 'soj',
    },
    {
      id: '22222',
      text: 'nazdar',
    },
  ];

  const newItem = {
    id: '12345',
    text: 'text',
  };
  const deleteItemAction = actions.deleteItem('00000');
  const updateItemAction = actions.updateItemText('00000', 'new text');
  const fetchItemsSuccessAction = actions.fetchItemsSuccess(json);
  const postItemSuccessAction = actions.postItemSuccess(newItem);


  it('should return the initial state if action is uknown or not provided', () => {
    const actualState = itemsById(stateBefore, UNKNOWN_ACTION);

    expect(actualState).toEqual(stateBefore);
  });

  it('should return empty immutable emptyItemsById if no state is provided', () => {
    const actualState = itemsById(undefined, UNKNOWN_ACTION);

    expect(actualState).toEqual(Immutable.Map());
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

  it('should handle FETCH_ITEMS_SUCCESS action', () => {
    const expectedState = stateBefore;
    const actualState = itemsById(undefined, fetchItemsSuccessAction);

    expect(actualState).toEqual(expectedState);
  });

  it('should handle POST_ITEM_SUCCESS action', () => {
    const addedItem = new ItemRecord({
      guid: '12345',
      text: 'text',
    });
    const expectedState = stateBefore.set('12345', addedItem);
    const actualState = itemsById(stateBefore, postItemSuccessAction);

    expect(actualState).toEqual(expectedState);
  });
});
