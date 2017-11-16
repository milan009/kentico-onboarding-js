import { itemReducer } from '../../../src/reducers/list/itemReducer.ts';
import { ItemData } from '../../../src/models/ItemData.ts';
import { PUT_REQUEST_STARTED } from '../../../src/actions/actionTypes.ts';
import { putStarted } from '../../../src/actions/actionCreators.ts';

describe('Item reducer', () => {
  describe(`"${PUT_REQUEST_STARTED}" action`, () => {
    it('saves changed text correctly in ItemData', () => {
      const prevState = new ItemData({
        text: 'Mlock',
      });
      const expectedState = new ItemData({
        text: 'Glock',
      });

      const action = putStarted(expectedState);

      const createdState = itemReducer(prevState, action);

      expect(createdState).toEqual(expectedState);
    });
  });

  describe('unknown action type', () => {
    const action = { type: 'unknown' };

    it('returns default state on undefined', () => {
      const expectedState = new ItemData();

      const createdState = itemReducer(undefined, action);

      expect(createdState).toEqual(expectedState);
    });

    it('does not change state', () => {
      const prevState = new ItemData({
        text: 'Mlock',
      });

      const createdState = itemReducer(prevState, action);

      expect(createdState).toBe(prevState);
    });
  });
});
