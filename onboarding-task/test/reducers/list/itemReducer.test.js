import * as actionTypes from '../../../src/actions/actionTypes';
import * as actionCreators from '../../../src/actions/actionCreators';
import { itemReducer } from '../../../src/reducers/list/itemReducer';
import { ItemData } from '../../../src/models/ItemData';
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
      const action = actionCreators.saveChange(42, 'Glock');

      const createdState = itemReducer(prevState, action);

      expect(createdState).toEqual(expectedState);
    });
  });
});
