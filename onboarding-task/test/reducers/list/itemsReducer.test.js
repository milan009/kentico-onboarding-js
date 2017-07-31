import { OrderedMap } from 'immutable';

import * as actionCreators from '../../../src/actions/actionCreators';
import { itemFlagsMapReducer } from '../../../src/reducers/list/itemFlagsMapReducer';
import { itemsReducer } from '../../../src/reducers/list/itemsReducer';
import { ItemData } from '../../../src/models/ItemData';
import { ItemFlags } from '../../../src/models/ItemFlags';

describe('Items map reducer', () => {
  const defaultItemsState = new OrderedMap([
    [
      '0',
      new ItemData({
        text: 'Mlock',
      }),
    ],
    [
      '1',
      new ItemData({
        text: 'Block',
      }),
    ],
  ]);

  describe('"ITEM_CREATED" action', () => {
    it('adds item without passed state', () => {
      const mockId = '12345678-0000-0000-0000-000000000000';
      const mockIdCreator = () => mockId;
      const expectedState = new OrderedMap([
        [
          mockId, new ItemData({
            text: 'Mlok',
          }),
        ],
      ]);
      const action = actionCreators.createItem('Mlok', mockIdCreator);

      const createdState = itemsReducer(undefined, action);

      expect(createdState).toEqual(expectedState);
    });

    it('adds item to existing map', () => {
      const mockId = '12345678-0000-0000-0000-000000000000';
      const mockIdCreator = () => mockId;
      const expectedState = new OrderedMap([...defaultItemsState, [mockId, new ItemFlags()]]);
      const action = actionCreators.createItem('Glock', mockIdCreator);

      const createdState = itemFlagsMapReducer(defaultItemsState, action);

      expect(createdState).toEqual(expectedState);
    });
  });

  describe('"ITEM_DELETED" action', () => {
    it('does nothing without passed state', () => {
      const action = actionCreators.deleteItem('42');
      const expectedState = new OrderedMap();

      const createdState = itemsReducer(undefined, action);

      expect(createdState).toEqual(expectedState);
    });

    it('does nothing to state not containing given id', () => {
      const action = actionCreators.deleteItem('42');
      const expectedState = defaultItemsState;

      const createdState = itemsReducer(defaultItemsState, action);

      expect(createdState).toEqual(expectedState);
    });

    it('correctly removes item', () => {
      const action = actionCreators.deleteItem('0');
      const expectedState = new OrderedMap([
        [
          '1',
          new ItemData({
            text: 'Block',
          }),
        ],
      ]);
      const createdState = itemFlagsMapReducer(defaultItemsState, action);

      expect(createdState).toEqual(expectedState);
    });
  });

  describe('"ITEM_CHANGE_SAVED" action', () => {
    it('does nothing without passed state', () => {
      const action = actionCreators.saveChange('42', 'Glock');
      const expectedState = new OrderedMap();

      const createdState = itemsReducer(undefined, action);

      expect(createdState).toEqual(expectedState);
    });

    it('does nothing to state not containing given id', () => {
      const action = actionCreators.saveChange('42', 'Glock');
      const expectedState = defaultItemsState;

      const createdState = itemsReducer(defaultItemsState, action);

      expect(createdState).toEqual(expectedState);
    });

    it('correctly changes ItemData', () => {
      const action = actionCreators.saveChange('0', 'Glock');
      const expectedState = new OrderedMap([
        [
          '0',
          new ItemData({
            text: 'Glock',
          }),
        ],
        [
          '1',
          new ItemData({
            text: 'Block',
          }),
        ],
      ]);

      const createdState = itemsReducer(defaultItemsState, action);

      expect(createdState).toEqual(expectedState);
    });
  });
});
