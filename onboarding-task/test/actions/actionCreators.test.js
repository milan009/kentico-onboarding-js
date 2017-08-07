import * as actionCreators from '../../src/actions/actionCreators';
import * as actionTypes from '../../src/actions/actionTypes';

describe('Action creators', () => {
  const mockId = '123';
  const mockIdGenerator = () => mockId;

  it(`create "${actionTypes.ITEM_CREATED}" action correctly`, () => {
    const expectedAction = {
      type: actionTypes.ITEM_CREATED,
      payload: {
        text: 'New Item',
        newId: mockId,
      },
    };

    const createdAction = actionCreators.createItemFactory(mockIdGenerator)('New Item');

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
