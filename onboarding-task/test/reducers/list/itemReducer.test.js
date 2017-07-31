import * as actionCreators from '../../../src/actions/actionCreators';
import { itemReducer } from '../../../src/reducers/list/itemReducer';
import { ItemData } from '../../../src/models/ItemData';

describe('Item reducer', () => {
  describe('"ITEM_CHANGE_SAVED" action', () => {
    it('saves changed text correctly in ItemData', () => {
      const prevState = new ItemData({
        text: 'Mlok',
      });
      const expectedState = new ItemData({
        text: 'Glock',
      });
      const action = actionCreators.saveChange(42, 'Glock');

      const createdState = itemReducer(prevState, action);

      expect(createdState).toEqual(expectedState);
    });
  });
});
