import { itemReducer } from '../../../src/reducers/list/itemReducer';
import { ItemData } from '../../../src/models/ItemData';
import { ITEM_CHANGE_SAVED } from '../../../src/actions/actionTypes';
import { saveChange } from '../../../src/actions/actionCreators';

describe('Item reducer', () => {
  describe(`"${ITEM_CHANGE_SAVED}" action`, () => {
    it('saves changed default state on undefined', () => {
      const expectedState = new ItemData({
        text: 'Mlock',
      });
      const action = saveChange('0', 'Mlock');

      const createdState = itemReducer(undefined, action);

      expect(createdState).toEqual(expectedState);
    });

    it('saves changed text correctly in ItemData', () => {
      const prevState = new ItemData({
        text: 'Mlock',
      });
      const expectedState = new ItemData({
        text: 'Glock',
      });
      const action = saveChange('42', 'Glock');

      const createdState = itemReducer(prevState, action);

      expect(createdState).toEqual(expectedState);
    });
  });

  describe('unknown action type', () => {
    it('does not change state', () => {
      const action = { type: 'unknown' };
      const prevState = new ItemData({
        text: 'Mlock',
      });
      const expectedState = prevState;

      const createdState = itemReducer(prevState, action);

      expect(createdState).toBe(expectedState);
    });
  });
});
