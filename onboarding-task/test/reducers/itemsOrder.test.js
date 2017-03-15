import { itemsOrder } from '../../src/reducers/itemsOrder';
import * as actions from '../../src/actions/actionCreators';
import * as Immutable from 'immutable';
import { addItemFactory } from '../../src/actions/actionDependencies/addItemFactory';

describe('itemsOrder reducer', () => {
  const UNKNOWN_ACTION = 'uknown action';

  const stateBefore = Immutable.OrderedSet(['00000', '11111', '22222']);

  const addItemAction = addItemFactory(() => '12345')('text');
  const deleteItemAction = actions.deleteItem('00000');


  it('should return empty list if action is uknown or not provided', () => {
    const actualState = itemsOrder(stateBefore, UNKNOWN_ACTION);

    expect(actualState).toEqual(stateBefore);
  });

  it('should return empty immutable list if no state is provided', () => {
    const actualState = itemsOrder(undefined, UNKNOWN_ACTION);

    expect(actualState).toEqual(Immutable.OrderedSet());
  });

  it('should handle ADD_ITEM action', () => {
    const expectedState = stateBefore.add('12345');
    const actualState = itemsOrder(stateBefore, addItemAction);

    expect(actualState).toEqual(expectedState);
  });

  it('should handle DELETE_ITEM action', () => {
    const expectedState = Immutable.OrderedSet(['11111', '22222']);
    const actualState = itemsOrder(stateBefore, deleteItemAction);

    expect(actualState).toEqual(expectedState);
  });
});

