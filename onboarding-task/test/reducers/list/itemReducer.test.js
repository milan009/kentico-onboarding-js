import * as actionTypes from '../../../src/actions/actionTypes';
import * as actionCreators from '../../../src/actions/actionCreators';
import { itemReducer } from '../../../src/reducers/list/itemReducer';
import { ItemData } from '../../../src/models/ItemData';

describe('Item reducer', () => {
  describe(`"${actionTypes.ITEM_CHANGE_SAVED}" action`, () => {
    it('saves changed default state on undefined', () => {
      const expectedState = new ItemData({
        text: 'Mlock',
      });
      const action = actionCreators.saveChange('0', 'Mlock');

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
      const action = actionCreators.saveChange('42', 'Glock');

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
