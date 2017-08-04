import * as actionCreators from '../../src/actions/actionCreators.ts';
import * as actionTypes from '../../src/actions/actionTypes.ts';
import { mockIdGenerator } from '../testUtils/mockIdGenerator';

describe('CreateItemFactory', () => {
  it('creates the creator correctly', () => {
    const expectedActionCreator = (text) => ({
      type: actionTypes.ITEM_CREATED,
      payload: {
        text,
        newId: mockIdGenerator(178),
      },
    });

    const createdActionCreator = actionCreators.createItemFactory({ idGenerator: () => mockIdGenerator(178) });

    expect(createdActionCreator()).toEqual(expectedActionCreator());
  });
});

describe('Action creators', () => {
  it(`create "${actionTypes.ITEM_CREATED}" action correctly`, () => {
    const expectedAction = {
      type: actionTypes.ITEM_CREATED,
      payload: {
        text: 'New Item',
        newId: '17800000-0000-0000-0000-000000000000',
      },
    };

    const createdAction = actionCreators.createItemFactory({ idGenerator: () => mockIdGenerator(178) })('New Item');

    expect(createdAction).toEqual(expectedAction);
  });

  it(`create "${actionTypes.ITEM_DELETED}" action correctly`, () => {
    const expectedAction = {
      type: actionTypes.ITEM_DELETED,
      payload: {
        id: '17',
      },
    };

    const createdAction = actionCreators.deleteItem('17');

    expect(createdAction).toEqual(expectedAction);
  });

  it(`creates "${actionTypes.ITEM_CHANGE_CANCELLED}" action correctly`, () => {
    const expectedAction = {
      type: actionTypes.ITEM_CHANGE_CANCELLED,
      payload: {
        id: '17',
      },
    };

    const createdAction = actionCreators.cancelChange('17');

    expect(createdAction).toEqual(expectedAction);
  });

  it(`creates "${actionTypes.ITEM_CHANGE_SAVED}" action correctly`, () => {
    const expectedAction = {
      type: actionTypes.ITEM_CHANGE_SAVED,
      payload: {
        id: '17',
        text: 'Edited Text',
      },
    };

    const createdAction = actionCreators.saveChange('17', 'Edited Text');

    expect(createdAction).toEqual(expectedAction);
  });

  it(`creates "${actionTypes.ITEM_MAKE_EDITABLE}" action correctly`, () => {
    const expectedAction = {
      type: actionTypes.ITEM_MAKE_EDITABLE,
      payload: {
        id: '17',
      },
    };

    const createdAction = actionCreators.makeEditable('17');

    expect(createdAction).toEqual(expectedAction);
  });
});
