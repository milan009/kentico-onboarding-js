import * as actionTypes from '../../../src/actions/actionTypes.ts';
import * as actionCreators from '../../../src/actions/actionCreators.ts';
import { itemReducer } from '../../../src/reducers/list/itemReducer.ts';
import { ItemData } from '../../../src/models/ItemData.ts';
import * as testData from '../../testUtils/testData';

describe('Item reducer', () => {
  describe(`"${actionTypes.ITEM_CHANGE_SAVED}" action`, () => {
    it('saves changed default state on undefined', () => {
      const expectedState = new ItemData({
        text: testData.mockTexts[1],
      });
      const action = actionCreators.saveChange(testData.mockDefaultId, testData.mockTexts[1]);

      const createdState = itemReducer(undefined, action);

      expect(createdState).toEqual(expectedState);
    });

    it('saves changed text correctly in ItemData', () => {
      const prevState = new ItemData({
        text: testData.mockTexts[0],
      });
      const expectedState = new ItemData({
        text: testData.mockTexts[1],
      });
      const action = actionCreators.saveChange('42', 'Glock');

      const createdState = itemReducer(prevState, action);

      expect(createdState).toEqual(expectedState);
    });
  });

  describe('unknown action type', () => {
    it('does not change state', () => {
      const action = testData.unknownAction;
      const prevState = new ItemData({
        text: testData.mockTexts[1],
      });
      const expectedState = new ItemData({
        text: testData.mockTexts[1],
      });

      const createdState = itemReducer(prevState, action);

      expect(createdState).toEqual(expectedState);
    });
  });
});
