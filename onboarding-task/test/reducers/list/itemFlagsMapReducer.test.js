import { OrderedMap } from 'immutable';

import * as actionTypes from '../../../src/actions/actionTypes';
import * as actionCreators from '../../../src/actions/actionCreators';
import { itemFlagsMapReducer } from '../../../src/reducers/list/itemFlagsMapReducer';
import { ItemFlags } from '../../../src/models/ItemFlags';

describe('ItemFlags map reducer with', () => {
  const testFlagsMapState = new OrderedMap([
    [
      '0',
      new ItemFlags({
        isBeingEdited: true,
      }),
    ],
    [
      '1',
      new ItemFlags(),
    ],
  ]);
  const mockId = '123';
  const mockIdGenerator = () => mockId;

  describe(`"${actionTypes.ITEM_CREATED}" action`, () => {
    it('adds ItemFlags to default state', () => {
      const expectedState = new OrderedMap([
        [
          mockId,
          new ItemFlags(),
        ],
      ]);
      const action = actionCreators.createItemFactory(mockIdGenerator)('Mlock');

      const createdState = itemFlagsMapReducer(undefined, action);

      expect(createdState).toEqual(expectedState);
    });

    it('adds ItemFlags to existing map', () => {
      const prevState = testFlagsMapState;
      const expectedState = new OrderedMap([...prevState, [mockId, new ItemFlags()]]);
      const action = actionCreators.createItemFactory(mockIdGenerator)('Mlock');

      const createdState = itemFlagsMapReducer(prevState, action);

      expect(createdState).toEqual(expectedState);
    });
  });

  describe(`"${actionTypes.ITEM_DELETED}" action`, () => {
    it('returns default state on "undefined" previous state', () => {
      const action = actionCreators.deleteItem('42');
      const expectedState = new OrderedMap();

      const createdState = itemFlagsMapReducer(undefined, action);

      expect(createdState).toEqual(expectedState);
    });

    it('does not change the state that does not contain given id', () => {
      const action = actionCreators.deleteItem('42');
      const expectedState = testFlagsMapState;

      const createdState = itemFlagsMapReducer(testFlagsMapState, action);

      expect(createdState).toBe(expectedState);
    });

    it('correctly removes item', () => {
      const action = actionCreators.deleteItem('0');
      const expectedState = new OrderedMap([
        [
          '1',
          new ItemFlags(),
        ],
      ]);

      const createdState = itemFlagsMapReducer(testFlagsMapState, action);

      expect(createdState).toEqual(expectedState);
    });
  });

  describe(`"${actionTypes.ITEM_CHANGE_SAVED}" action`, () => {
    it('returns default state on undefined', () => {
      const action = actionCreators.saveChange('42', 'Glock');
      const expectedState = new OrderedMap();

      const createdState = itemFlagsMapReducer(undefined, action);

      expect(createdState).toEqual(expectedState);
    });

    it('does not change the state that does not contain given id', () => {
      const action = actionCreators.saveChange('42', 'Glock');
      const expectedState = testFlagsMapState;

      const createdState = itemFlagsMapReducer(testFlagsMapState, action);

      expect(createdState).toBe(expectedState);
    });

    it('makes edited ItemFlags no longer editable', () => {
      const action = actionCreators.saveChange('0', 'Glock');
      const expectedState = new OrderedMap([
        [
          '0',
          new ItemFlags(),
        ],
        [
          '1',
          new ItemFlags(),
        ],
      ]);

      const createdState = itemFlagsMapReducer(testFlagsMapState, action);

      expect(createdState).toEqual(expectedState);
    });
  });

  describe(`"${actionTypes.ITEM_MAKE_EDITABLE}" action`, () => {
    it('returns default state on undefined', () => {
      const action = actionCreators.makeEditable('42');
      const expectedState = new OrderedMap();

      const createdState = itemFlagsMapReducer(undefined, action);

      expect(createdState).toEqual(expectedState);
    });

    it('does nothing to state not containing given id', () => {
      const action = actionCreators.makeEditable('42');
      const expectedState = testFlagsMapState;

      const createdState = itemFlagsMapReducer(testFlagsMapState, action);

      expect(createdState).toBe(expectedState);
    });

    it('does nothing to ItemFlags that is already editable', () => {
      const action = actionCreators.makeEditable('0');
      const expectedState = testFlagsMapState;

      const createdState = itemFlagsMapReducer(testFlagsMapState, action);

      expect(createdState).toBe(expectedState);
    });

    it('makes ItemFlags editable correctly', () => {
      const action = actionCreators.makeEditable('1');
      const expectedState = new OrderedMap([
        [
          '0',
          new ItemFlags({
            isBeingEdited: true,
          }),
        ],
        [
          '1',
          new ItemFlags({
            isBeingEdited: true,
          }),
        ],
      ]);

      const createdState = itemFlagsMapReducer(testFlagsMapState, action);

      expect(createdState).toEqual(expectedState);
    });
  });

  describe(`"${actionTypes.ITEM_CHANGE_CANCELLED}" action`, () => {
    it('returns default state on undefined', () => {
      const action = actionCreators.cancelChange('42');
      const expectedState = new OrderedMap();

      const createdState = itemFlagsMapReducer(undefined, action);

      expect(createdState).toEqual(expectedState);
    });

    it('does nothing to state not containing given id', () => {
      const action = actionCreators.cancelChange('42');
      const expectedState = testFlagsMapState;

      const createdState = itemFlagsMapReducer(testFlagsMapState, action);

      expect(createdState).toBe(expectedState);
    });

    it('does nothing to ItemFlags that is not editable', () => {
      const action = actionCreators.cancelChange('1');
      const expectedState = testFlagsMapState;

      const createdState = itemFlagsMapReducer(testFlagsMapState, action);

      expect(createdState).toBe(expectedState);
    });

    it('makes ItemFlags not-editable correctly', () => {
      const action = actionCreators.cancelChange('0');
      const expectedState = new OrderedMap([
        [
          '0',
          new ItemFlags(),
        ],
        [
          '1',
          new ItemFlags(),
        ],
      ]);

      const createdState = itemFlagsMapReducer(testFlagsMapState, action);

      expect(createdState).toEqual(expectedState);
    });
  });

  describe('unknown action type', () => {
    const action = { type: 'unknownType' };

    it('returns default state on undefined', () => {
      const expectedState = new OrderedMap();

      const createdState = itemFlagsMapReducer(undefined, action);

      expect(createdState).toBe(expectedState);
    });

    it('does not change state', () => {
      const expectedState = testFlagsMapState;

      const createdState = itemFlagsMapReducer(testFlagsMapState, action);

      expect(createdState).toBe(expectedState);
    });
  });
});
