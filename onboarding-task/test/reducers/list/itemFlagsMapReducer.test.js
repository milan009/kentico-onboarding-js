import { OrderedMap } from 'immutable';

import * as actionTypes from '../../../src/actions/actionTypes';
import * as actionCreators from '../../../src/actions/actionCreators';
import { itemFlagsMapReducer } from '../../../src/reducers/list/itemFlagsMapReducer';
import { ItemFlags } from '../../../src/models/ItemFlags';
import * as testData from '../../testUtils/testData';

describe('ItemFlags map reducer with', () => {
  const mockFlagsMapState = testData.mockItemsFlagsMapWithTwoFlagsItems;

  describe(`"${actionTypes.ITEM_CREATED}" action`, () => {
    it('adds ItemFlags to default state', () => {
      const expectedState = new OrderedMap([[testData.mockIds[0], testData.mockItemFlagsObjects[0]]]);
      const action = actionCreators.createItemFactory({ idGenerator: testData.mockIdGenerators[0] })(testData.mockTexts[0]);

      const createdState = itemFlagsMapReducer(undefined, action);

      expect(createdState).toEqual(expectedState);
    });

    it('adds ItemFlags to existing map', () => {
      const prevState = mockFlagsMapState;
      const expectedState = new OrderedMap([...prevState, [testData.mockIds[2], testData.mockItemFlagsObjects[2]]]);
      const action = actionCreators.createItemFactory({ idGenerator: testData.mockIdGenerators[2] })(testData.mockTexts[2]);

      const createdState = itemFlagsMapReducer(prevState, action);

      expect(createdState).toEqual(expectedState);
    });
  });

  describe(`"${actionTypes.ITEM_DELETED}" action`, () => {
    it('returns default state on "undefined" previous state', () => {
      const action = actionCreators.deleteItem('42');
      const expectedState = testData.mockItemsFlagsEmptyMap;

      const createdState = itemFlagsMapReducer(undefined, action);

      expect(createdState).toEqual(expectedState);
    });

    it('does not change the state that does not contain given id', () => {
      const action = actionCreators.deleteItem('42');
      const expectedState = mockFlagsMapState;

      const createdState = itemFlagsMapReducer(mockFlagsMapState, action);

      expect(createdState).toEqual(expectedState);
    });

    it('correctly removes item', () => {
      const action = actionCreators.deleteItem(testData.mockIds[1]);
      const expectedState = testData.mockItemsFlagsMapWithSingleFlagsItem;

      const createdState = itemFlagsMapReducer(mockFlagsMapState, action);

      expect(createdState).toEqual(expectedState);
    });
  });

  describe(`"${actionTypes.ITEM_CHANGE_SAVED}" action`, () => {
    it('returns default state on undefined', () => {
      const action = actionCreators.saveChange('42', 'Glock');
      const expectedState = testData.mockItemsFlagsEmptyMap;

      const createdState = itemFlagsMapReducer(undefined, action);

      expect(createdState).toEqual(expectedState);
    });

    it('does not change the state that does not contain given id', () => {
      const action = actionCreators.saveChange('42', 'Glock');
      const expectedState = mockFlagsMapState;

      const createdState = itemFlagsMapReducer(mockFlagsMapState, action);

      expect(createdState).toEqual(expectedState);
    });

    it('makes edited ItemFlags no longer editable', () => {
      const action = actionCreators.saveChange(testData.mockIds[1], 'Glock');
      const expectedState = new OrderedMap([
        ...testData.mockItemsFlagsMapWithSingleFlagsItem,
        [
          testData.mockIds[1],
          new ItemFlags(),
        ],
      ]);

      const createdState = itemFlagsMapReducer(mockFlagsMapState, action);

      expect(createdState).toEqual(expectedState);
    });
  });

  describe(`"${actionTypes.ITEM_MAKE_EDITABLE}" action`, () => {
    it('returns default state on undefined', () => {
      const action = actionCreators.makeEditable('42');
      const expectedState = testData.mockItemsFlagsEmptyMap;

      const createdState = itemFlagsMapReducer(undefined, action);

      expect(createdState).toEqual(expectedState);
    });

    it('does nothing to state not containing given id', () => {
      const action = actionCreators.makeEditable('42');
      const expectedState = mockFlagsMapState;

      const createdState = itemFlagsMapReducer(mockFlagsMapState, action);

      expect(createdState).toEqual(expectedState);
    });

    it('does nothing to ItemFlags that is already editable', () => {
      const action = actionCreators.makeEditable(testData.mockIds[1]);
      const expectedState = mockFlagsMapState;

      const createdState = itemFlagsMapReducer(mockFlagsMapState, action);

      expect(createdState).toEqual(expectedState);
    });

    it('makes ItemFlags editable correctly', () => {
      const action = actionCreators.makeEditable(testData.mockIds[0]);
      const expectedState = new OrderedMap([
        [
          testData.mockIds[0],
          new ItemFlags({
            isBeingEdited: true,
          }),
        ],
        [
          testData.mockIds[1],
          new ItemFlags({
            isBeingEdited: true,
          }),
        ],
      ]);

      const createdState = itemFlagsMapReducer(mockFlagsMapState, action);

      expect(createdState).toEqual(expectedState);
    });
  });

  describe(`"${actionTypes.ITEM_CHANGE_CANCELLED}" action`, () => {
    it('returns default state on undefined', () => {
      const action = actionCreators.cancelChange('42');
      const expectedState = testData.mockItemsFlagsEmptyMap;

      const createdState = itemFlagsMapReducer(undefined, action);

      expect(createdState).toEqual(expectedState);
    });

    it('does nothing to state not containing given id', () => {
      const action = actionCreators.cancelChange('42');
      const expectedState = mockFlagsMapState;

      const createdState = itemFlagsMapReducer(mockFlagsMapState, action);

      expect(createdState).toEqual(expectedState);
    });

    it('does nothing to ItemFlags that is not editable', () => {
      const action = actionCreators.cancelChange(testData.mockIds[0]);
      const expectedState = mockFlagsMapState;

      const createdState = itemFlagsMapReducer(mockFlagsMapState, action);

      expect(createdState).toEqual(expectedState);
    });

    it('makes ItemFlags not-editable correctly', () => {
      const action = actionCreators.cancelChange(testData.mockIds[1]);
      const expectedState = new OrderedMap([
        [
          testData.mockIds[0],
          new ItemFlags(),
        ],
        [
          testData.mockIds[1],
          new ItemFlags(),
        ],
      ]);

      const createdState = itemFlagsMapReducer(mockFlagsMapState, action);

      expect(createdState).toEqual(expectedState);
    });
  });

  describe('unknown action type', () => {

  });
});
