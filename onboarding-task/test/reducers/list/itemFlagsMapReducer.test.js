import { OrderedMap } from 'immutable';

import * as actionCreators from '../../../src/actions/actionCreators';
import { itemFlagsMapReducer } from '../../../src/reducers/list/itemFlagsMapReducer';
import { ItemFlags } from '../../../src/models/ItemFlags';

describe('ItemFlags map reducer', () => {
  const defaultFlagsMapState = new OrderedMap([
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

  describe('"ITEM_CREATED" action', () => {
    it('adds ItemFlags without passed state', () => {
      const mockId = '12345678-0000-0000-0000-000000000000';
      const mockIdCreator = () => mockId;
      const expectedState = new OrderedMap([[mockId, new ItemFlags()]]);
      const action = actionCreators.createItem('Mlok', mockIdCreator);

      const createdState = itemFlagsMapReducer(undefined, action);

      expect(createdState).toEqual(expectedState);
    });

    it('adds ItemFlags to existing map', () => {
      const mockId = '12345678-0000-0000-0000-000000000000';
      const mockIdCreator = () => mockId;
      const prevState = defaultFlagsMapState;
      const expectedState = new OrderedMap([...prevState, [mockId, new ItemFlags()]]);
      const action = actionCreators.createItem('Mlok', mockIdCreator);

      const createdState = itemFlagsMapReducer(prevState, action);

      expect(createdState).toEqual(expectedState);
    });
  });

  describe('"ITEM_DELETED" action', () => {
    it('does nothing without passed state', () => {
      const action = actionCreators.deleteItem('42');
      const expectedState = new OrderedMap();

      const createdState = itemFlagsMapReducer(undefined, action);

      expect(createdState).toEqual(expectedState);
    });

    it('does nothing to state not containing given id', () => {
      const action = actionCreators.deleteItem('42');
      const expectedState = defaultFlagsMapState;

      const createdState = itemFlagsMapReducer(defaultFlagsMapState, action);

      expect(createdState).toEqual(expectedState);
    });

    it('correctly removes item', () => {
      const action = actionCreators.deleteItem('0');
      const expectedState = new OrderedMap([
        [
          '1',
          new ItemFlags(),
        ],
      ]);
      const createdState = itemFlagsMapReducer(defaultFlagsMapState, action);

      expect(createdState).toEqual(expectedState);
    });
  });

  describe('"ITEM_CHANGE_SAVED" action', () => {
    it('does nothing without passed state', () => {
      const action = actionCreators.saveChange('42', 'Glock');
      const expectedState = new OrderedMap();

      const createdState = itemFlagsMapReducer(undefined, action);

      expect(createdState).toEqual(expectedState);
    });

    it('does nothing to state not containing given id', () => {
      const action = actionCreators.saveChange('42', 'Glock');
      const expectedState = defaultFlagsMapState;

      const createdState = itemFlagsMapReducer(defaultFlagsMapState, action);

      expect(createdState).toEqual(expectedState);
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

      const createdState = itemFlagsMapReducer(defaultFlagsMapState, action);

      expect(createdState).toEqual(expectedState);
    });
  });

  describe('"ITEM_MAKE_EDITABLE" action', () => {
    it('does nothing without passed state', () => {
      const action = actionCreators.makeEditable('42');
      const expectedState = new OrderedMap();

      const createdState = itemFlagsMapReducer(undefined, action);

      expect(createdState).toEqual(expectedState);
    });

    it('does nothing to state not containing given id', () => {
      const action = actionCreators.makeEditable('42');
      const expectedState = defaultFlagsMapState;

      const createdState = itemFlagsMapReducer(defaultFlagsMapState, action);

      expect(createdState).toEqual(expectedState);
    });

    it('does nothing to ItemFlags that is already editable', () => {
      const action = actionCreators.makeEditable('0');
      const expectedState = defaultFlagsMapState;

      const createdState = itemFlagsMapReducer(defaultFlagsMapState, action);

      expect(createdState).toEqual(expectedState);
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

      const createdState = itemFlagsMapReducer(defaultFlagsMapState, action);

      expect(createdState).toEqual(expectedState);
    });
  });

  describe('"ITEM_CHANGE_CANCELLED" action', () => {
    it('does nothing without passed state', () => {
      const action = actionCreators.cancelChange('42');
      const expectedState = new OrderedMap();

      const createdState = itemFlagsMapReducer(undefined, action);

      expect(createdState).toEqual(expectedState);
    });

    it('does nothing to state not containing given id', () => {
      const action = actionCreators.cancelChange('42');
      const expectedState = defaultFlagsMapState;

      const createdState = itemFlagsMapReducer(defaultFlagsMapState, action);

      expect(createdState).toEqual(expectedState);
    });

    it('does nothing to ItemFlags that is not editable', () => {
      const action = actionCreators.cancelChange('1');
      const expectedState = defaultFlagsMapState;

      const createdState = itemFlagsMapReducer(defaultFlagsMapState, action);

      expect(createdState).toEqual(expectedState);
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

      const createdState = itemFlagsMapReducer(defaultFlagsMapState, action);

      expect(createdState).toEqual(expectedState);
    });
  });
});
