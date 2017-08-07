import { OrderedMap } from 'immutable';

import { itemFlagsMapReducer } from '../../../src/reducers/list/itemFlagsMapReducer';
import { itemsReducer } from '../../../src/reducers/list/itemsReducer';
import { ItemData } from '../../../src/models/ItemData';
import {
  ITEM_CHANGE_SAVED,
  ITEM_CREATED,
  ITEM_DELETED,
} from '../../../src/actions/actionTypes';
import {
  createItemFactory,
  deleteItem,
  saveChange,
} from '../../../src/actions/actionCreators';

describe('Items map reducer with', () => {
  const testItemsMapState = new OrderedMap([
    [
      '0',
      new ItemData({
        id: '0',
        text: 'Mlock',
      }),
    ],
    [
      '1',
      new ItemData({
        id: '1',
        text: 'Glock',
      }),
    ],
  ]);
  const mockId = '123';
  const mockIdGenerator = () => mockId;

  describe(`"${ITEM_CREATED}" action`, () => {
    it('adds item with undefined state', () => {
      const expectedState = new OrderedMap([
        [
          mockId,
          new ItemData({
            id: mockId,
            text: 'Mlock',
          }),
        ],
      ]);
      const action = createItemFactory(mockIdGenerator)('Mlock');

      const createdState = itemsReducer(undefined, action);

      expect(createdState).toEqual(expectedState);
    });

    it('adds item to existing map', () => {
      const prevState = testItemsMapState;
      const expectedState = new OrderedMap([
        ...prevState,
        [
          mockId,
          new ItemData({
            id: mockId,
            text: 'Block',
          }),
        ],
      ]);
      const action = createItemFactory(mockIdGenerator)('Block');

      const createdState = itemsReducer(prevState, action);

      expect(createdState).toEqual(expectedState);
    });
  });

  describe(`"${ITEM_DELETED}" action`, () => {
    it('returns default state on undefined', () => {
      const action = deleteItem('42');
      const expectedState = new OrderedMap();

      const createdState = itemsReducer(undefined, action);

      expect(createdState).toEqual(expectedState);
    });

    it('does nothing to state not containing given id', () => {
      const action = deleteItem('42');
      const prevState = testItemsMapState;
      const expectedState = prevState;

      const createdState = itemsReducer(prevState, action);

      expect(createdState).toBe(expectedState);
    });

    it('correctly removes item', () => {
      const action = deleteItem('0');
      const prevState = testItemsMapState;
      const expectedState = new OrderedMap([
        [
          '1',
          new ItemData({
            id: '1',
            text: 'Glock',
          }),
        ],
      ]);

      const createdState = itemFlagsMapReducer(prevState, action);

      expect(createdState).toEqual(expectedState);
    });
  });

  describe(`"${ITEM_CHANGE_SAVED}" action`, () => {
    it('returns default state on undefined', () => {
      const action = saveChange('42', 'Glock');
      const expectedState = new OrderedMap();

      const createdState = itemsReducer(undefined, action);

      expect(createdState).toEqual(expectedState);
    });

    it('does nothing to state not containing given id', () => {
      const action = saveChange('42', 'Glock');
      const expectedState = testItemsMapState;

      const createdState = itemsReducer(testItemsMapState, action);

      expect(createdState).toBe(expectedState);
    });

    it('correctly changes ItemData', () => {
      const action = saveChange('1', 'Flock');
      const prevState = testItemsMapState;
      const expectedState = new OrderedMap([
        [
          '0',
          new ItemData({
            id: '0',
            text: 'Mlock',
          }),
        ],
        [
          '1',
          new ItemData({
            id: '1',
            text: 'Flock',
          }),
        ],
      ]);

      const createdState = itemsReducer(prevState, action);

      expect(createdState).toEqual(expectedState);
    });
  });

  describe('unknown action type', () => {
    it('does not change state', () => {
      const action = { type: 'unknown' };
      const prevState = testItemsMapState;
      const expectedState = testItemsMapState;

      const createdState = itemsReducer(prevState, action);

      expect(createdState).toBe(expectedState);
    });
  });
});
