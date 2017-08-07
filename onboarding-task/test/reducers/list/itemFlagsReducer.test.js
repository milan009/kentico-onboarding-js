import { itemFlagsReducer } from '../../../src/reducers/list/itemFlagsReducer';
import { ItemFlags } from '../../../src/models/ItemFlags';
import {
  ITEM_CHANGE_CANCELLED,
  ITEM_CHANGE_SAVED,
  ITEM_MAKE_EDITABLE,
} from '../../../src/actions/actionTypes';
import {
  cancelChange,
  makeEditable,
  saveChange,
} from '../../../src/actions/actionCreators';

describe('ItemFlags reducer with', () => {
  describe(`"${ITEM_MAKE_EDITABLE}" action`, () => {
    it('returns default state on undefined(which was made editable)', () => {
      const expectedState = new ItemFlags({
        isBeingEdited: true,
      });
      const action = makeEditable('42');

      const createdState = itemFlagsReducer(undefined, action);

      expect(createdState).toEqual(expectedState);
    });

    it('makes ItemFlags edited correctly', () => {
      const prevState = new ItemFlags();
      const expectedState = new ItemFlags({
        isBeingEdited: true,
      });
      const action = makeEditable('42');

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
      const action = makeEditable('42');

      const createdState = itemFlagsReducer(prevState, action);

      expect(createdState).toEqual(expectedState);
    });
  });

  describe(`"${ITEM_CHANGE_CANCELLED}" action`, () => {
    it('does not change ItemFlags that is not being edited', () => {
      const prevState = new ItemFlags({
        isBeingEdited: false,
      });
      const expectedState = new ItemFlags({
        isBeingEdited: false,
      });
      const action = cancelChange('42');

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
      const action = cancelChange('42');

      const createdState = itemFlagsReducer(prevState, action);

      expect(createdState).toEqual(expectedState);
    });
  });

  describe(`"${ITEM_CHANGE_SAVED}" action`, () => {
    it('does not change ItemFlags that is not being edited', () => {
      const prevState = new ItemFlags({
        isBeingEdited: false,
      });
      const expectedState = prevState;
      const action = saveChange('42', 'New Text');

      const createdState = itemFlagsReducer(prevState, action);

      expect(createdState).toBe(expectedState);
    });

    it('makes edited ItemFlags not editable anymore', () => {
      const prevState = new ItemFlags({
        isBeingEdited: true,
      });
      const expectedState = new ItemFlags({
        isBeingEdited: false,
      });
      const action = saveChange('42', 'New Text');

      const createdState = itemFlagsReducer(prevState, action);

      expect(createdState).toEqual(expectedState);
    });
  });

  describe('unknown action type', () => {
    it('does not change state', () => {
      const action = { type: 'unknownType' };
      const prevState = new ItemFlags({
        isBeingEdited: true,
      });
      const expectedState = prevState;

      const createdState = itemFlagsReducer(prevState, action);

      expect(createdState).toBe(expectedState);
    });
  });
});
