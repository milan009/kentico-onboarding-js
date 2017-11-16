import { itemFlagsReducer } from '../../../src/reducers/list/itemFlagsReducer.ts';
import { ItemFlags } from '../../../src/models/ItemFlags.ts';
import {
  ITEM_CHANGE_CANCELLED,
  ITEM_MAKE_EDITABLE,
  DELETE_REQUEST_STARTED,
  DELETE_REQUEST_SUCCESS,
  DELETE_REQUEST_FAIL,

  PUT_REQUEST_STARTED,
  PUT_REQUEST_SUCCESS,
  PUT_REQUEST_FAIL,

  POST_REQUEST_SUCCESS,
  POST_REQUEST_STARTED,
  POST_REQUEST_FAIL,
} from '../../../src/actions/actionTypes.ts';
import {
  cancelChange,
  makeEditable,
  saveChange,
  deleteStarted,
} from '../../../src/actions/actionCreators.ts';

describe('ItemFlags reducer with', () => {
  describe(`"${ITEM_MAKE_EDITABLE}" action`, () => {
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
      const action = makeEditable('42');

      const createdState = itemFlagsReducer(prevState, action);

      expect(createdState).toBe(prevState);
    });
  });

  describe(`"${ITEM_CHANGE_CANCELLED}" action`, () => {
    it('does not change ItemFlags that is not being edited', () => {
      const prevState = new ItemFlags({
        isBeingEdited: false,
      });
      const action = cancelChange('42');

      const createdState = itemFlagsReducer(prevState, action);

      expect(createdState).toBe(prevState);
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

  describe(`"${DELETE_REQUEST_STARTED}" action`, () => {
    it('sets item flags correctly on edited item', () => {
      const prevState = new ItemFlags({
        isBeingEdited: true,
        isStored: true,
        requestError: null,
      });
      const expectedState = new ItemFlags({
        isBeingEdited: false,
        isStored: false,
        requestError: null,
      });
      const action = deleteStarted('42');

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
      const action = saveChange('42', 'New Text');

      const createdState = itemFlagsReducer(prevState, action);

      expect(createdState).toEqual(expectedState);
    });
  });

  describe('unknown action type', () => {
    const action = { type: 'unknownType' };

    it('returns default state on undefined', () => {
      const expectedState = new ItemFlags();

      const createdState = itemFlagsReducer(undefined, action);

      expect(createdState).toEqual(expectedState);
    });

    it('does not change state', () => {
      const prevState = new ItemFlags({
        isBeingEdited: true,
      });

      const createdState = itemFlagsReducer(prevState, action);

      expect(createdState).toBe(prevState);
    });
  });
});
