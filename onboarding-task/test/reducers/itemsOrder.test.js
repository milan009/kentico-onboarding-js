import { itemsOrder } from '../../src/reducers/itemsOrder.ts';
import * as actions from '../../src/actions/actionCreators.ts';
import * as Immutable from 'immutable';

describe('itemsOrder reducer', () => {
  const UNKNOWN_ACTION = 'uknown action';
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
  const stateBefore = Immutable.OrderedSet(['00000', '11111', '22222']);

  const deleteItemAction = actions.deleteItem('00000');
  const fetchItemsSuccessAction = actions.fetchItemsSuccess(json);
  const postItemSuccessAction = actions.postItemSuccess(newItem);

  it('should return empty list if action is uknown or not provided', () => {
    const actualState = itemsOrder(stateBefore, UNKNOWN_ACTION);

    expect(actualState).toEqual(stateBefore);
  });

  it('should return empty immutable list if no state is provided', () => {
    const actualState = itemsOrder(undefined, UNKNOWN_ACTION);

    expect(actualState).toEqual(Immutable.OrderedSet());
  });

  it('should handle DELETE_ITEM action', () => {
    const expectedState = Immutable.OrderedSet(['11111', '22222']);
    const actualState = itemsOrder(stateBefore, deleteItemAction);

    expect(actualState).toEqual(expectedState);
  });

  it('should handle FETCH_ITEMS_SUCCESS action', () => {
    const expectedState = stateBefore;
    const actualState = itemsOrder(undefined, fetchItemsSuccessAction);

    expect(actualState).toEqual(expectedState);
  });

  it('should handle POST_ITEM_SUCCESS action', () => {
    const expectedState = stateBefore.add('12345');
    const actualState = itemsOrder(stateBefore, postItemSuccessAction);

    expect(actualState).toEqual(expectedState);
  });
});
