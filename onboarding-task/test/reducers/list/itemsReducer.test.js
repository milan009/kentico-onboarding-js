import { OrderedMap } from 'immutable';

import * as actionTypes from '../../../src/actions/actionTypes';
import * as actionCreators from '../../../src/actions/actionCreators';
import { itemFlagsMapReducer } from '../../../src/reducers/list/itemFlagsMapReducer';
import { itemsReducer } from '../../../src/reducers/list/itemsReducer';
import { ItemData } from '../../../src/models/ItemData';
import * as testData from '../../testUtils/testData';

describe('Items map reducer with', () => {
  describe(`"${actionTypes.ITEM_CREATED}" action`, () => {
    it('adds item with undefined state', () => {
      const expectedState = testData.mockItemsDataMapWithSingleDataItem;
      const action = actionCreators.createItemFactory({ idGenerator: testData.mockIdGenerators[0] })(testData.mockTexts[0]);

      const createdState = itemsReducer(undefined, action);

      expect(createdState).toEqual(expectedState);
    });

    it('adds item to existing map', () => {
      const prevState = testData.mockItemsDataMapWithSingleDataItem;
      const expectedState = testData.mockItemsDataMapWithTwoDataItems;
      const action = actionCreators.createItemFactory({ idGenerator: testData.mockIdGenerators[1] })(testData.mockTexts[1]);

      const createdState = itemsReducer(prevState, action);

      expect(createdState).toEqual(expectedState);
    });
  });

  describe(`"${actionTypes.ITEM_DELETED}" action`, () => {
    it('returns default state on undefined', () => {
      const action = actionCreators.deleteItem('42');
      const expectedState = new OrderedMap();

      const createdState = itemsReducer(undefined, action);

      expect(createdState).toEqual(expectedState);
    });

    it('does nothing to state not containing given id', () => {
      const action = actionCreators.deleteItem('42');
      const prevState = testData.mockItemsDataMapWithSingleDataItem;
      const expectedState = prevState;

      const createdState = itemsReducer(prevState, action);

      expect(createdState).toEqual(expectedState);
    });

    it('correctly removes item', () => {
      const action = actionCreators.deleteItem(testData.mockIds[1]);
      const prevState = testData.mockItemsDataMapWithTwoDataItems;
      const expectedState = testData.mockItemsDataMapWithSingleDataItem;

      const createdState = itemFlagsMapReducer(prevState, action);

      expect(createdState).toEqual(expectedState);
    });
  });

  describe(`"${actionTypes.ITEM_CHANGE_SAVED}" action`, () => {
    it('returns default state on undefined', () => {
      const action = actionCreators.saveChange('42', 'Glock');
      const expectedState = new OrderedMap();

      const createdState = itemsReducer(undefined, action);

      expect(createdState).toEqual(expectedState);
    });

    it('does nothing to state not containing given id', () => {
      const action = actionCreators.saveChange('42', 'Glock');
      const expectedState = testData.mockItemsDataMapWithSingleDataItem;

      const createdState = itemsReducer(testData.mockItemsDataMapWithSingleDataItem, action);

      expect(createdState).toEqual(expectedState);
    });

    it('correctly changes ItemData', () => {
      const action = actionCreators.saveChange(testData.mockIds[1], 'Flock');
      const prevState = testData.mockItemsDataMapWithTwoDataItems;
      const expectedState = new OrderedMap([
        [
          testData.mockIds[0],
          testData.mockItemDataObjects[0],
        ],
        [
          testData.mockIds[1],
          new ItemData({
            id: testData.mockIds[1],
            text: 'Flock',
          }),
        ],
      ]);

      const createdState = itemsReducer(prevState, action);

      expect(createdState).toEqual(expectedState);
    });
  });
});
