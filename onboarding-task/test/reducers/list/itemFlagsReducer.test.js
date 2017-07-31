import * as actionCreators from '../../../src/actions/actionCreators';
import { itemFlagsReducer } from '../../../src/reducers/list/itemFlagsReducer';
import { ItemFlags } from '../../../src/models/ItemFlags';

describe('ItemFlags reducer', () => {
  describe('"ITEM_MAKE_EDITABLE" action', () => {
    it('makes ItemFlags edited correctly', () => {
      const prevState = new ItemFlags();
      const expectedState = new ItemFlags({
        isBeingEdited: true,
      });
      const action = actionCreators.makeEditable('42');

      const createdState = itemFlagsReducer(prevState, action);

      expect(createdState).toEqual(expectedState);
    });

    it('does not change already edited ItemFlags', () => {
      const prevState = new ItemFlags({
        isBeingEdited: true,
      });
      const expectedState = new ItemFlags({
        isBeingEdited: true,
      });
      const action = actionCreators.makeEditable('42');

      const createdState = itemFlagsReducer(prevState, action);

      expect(createdState).toEqual(expectedState);
    });
  });

  describe('"ITEM_CHANGE_CANCELLED" action', () => {
    it('does not change ItemFlags that is not being edited', () => {
      const prevState = new ItemFlags({
        isBeingEdited: false,
      });
      const expectedState = new ItemFlags({
        isBeingEdited: false,
      });
      const action = actionCreators.cancelChange('42');

      const createdState = itemFlagsReducer(prevState, action);

      expect(createdState).toEqual(expectedState);
    });

    it('makes edited ItemFlags not editable anymore', () => {
      const prevState = new ItemFlags(
        {
          isBeingEdited: true,
        }
      );
      const expectedState = new ItemFlags({
        isBeingEdited: false,
      });
      const action = actionCreators.cancelChange('42');

      const createdState = itemFlagsReducer(prevState, action);

      expect(createdState).toEqual(expectedState);
    });
  });

  describe('"ITEM_CHANGE_SAVED" action', () => {
    it('does not change ItemFlags that is not being edited', () => {
      const prevState = new ItemFlags({
        isBeingEdited: false,
      });
      const expectedState = new ItemFlags({
        isBeingEdited: false,
      });
      const action = actionCreators.saveChange('42', 'New Text');

      const createdState = itemFlagsReducer(prevState, action);

      expect(createdState).toEqual(expectedState);
    });

    it('makes edited ItemFlags not editable anymore', () => {
      const prevState = new ItemFlags({
        isBeingEdited: true,
      });
      const expectedState = new ItemFlags({
        isBeingEdited: false,
      });
      const action = actionCreators.saveChange('42', 'New Text');

      const createdState = itemFlagsReducer(prevState, action);

      expect(createdState).toEqual(expectedState);
    });
  });
});
