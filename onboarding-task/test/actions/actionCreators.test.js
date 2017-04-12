import * as actions from '../../src/actions/actionCreators.ts';
import * as types from '../../src/actions/actionTypes.ts';
// import { postItemFactory } from '../../src/actions/actionDependencies/postItemFactory.ts';

describe('actionCreators', () => {

  const text = 'New item';

  it('should create action for toggling edit mode', () => {
    const expectedAction = {
      type: types.TOGGLE_EDIT_MODE,
      payload: {
        guid: '00000',
      },
    };
    const actualAction = actions.toggleEditMode('00000');

    expect(actualAction).toEqual(expectedAction);
  });


  it('should create action for deleting item', () => {
    const expectedAction = {
      type: types.DELETE_ITEM,
      payload: {
        guid: '00000',
      },
    };
    const actualAction = actions.deleteItem('00000');

    expect(actualAction).toEqual(expectedAction);
  });

  it('should create action for updating item', () => {
    const expectedAction = {
      type: types.UPDATE_ITEM_TEXT,
      payload: {
        guid: '00000',
        text,
      },
    };
    const actualAction = actions.updateItemText('00000', text);

    expect(actualAction).toEqual(expectedAction);
  });


});

describe('fetch actionCreators tests', () => {
  const json = [
    {
      id: '12345',
      text: 'first item',
    },
    {
      id: '67890',
      text: 'second item',
    },
  ];

  it('should create action for requesting items', () => {
    const expectedAction = {
      type: types.FETCH_ITEMS_REQUEST,
    };
    const actualAction = actions.fetchItemsRequest();

    expect(actualAction).toEqual(expectedAction);
  });

  it('should create action for successful items fetch', () => {
    const expectedAction = {
      type: types.FETCH_ITEMS_SUCCESS,
      payload: {
        items: json,
      }
    };
    const actualAction = actions.fetchItemsSuccess(json);

    expect(actualAction).toEqual(expectedAction);
  });

  it('should create action for failed items fetch', () => {
    const error = new Error('fetching items failed');
    const expectedAction = {
      type: types.FETCH_ITEMS_FAILURE,
      payload: {
        error
      }
    };
    const actualAction = actions.fetchItemsFailure(error);

    expect(actualAction).toEqual(expectedAction);
  });
});

describe('post actionCreators tests', () => {
  const json = [
    {
      id: undefined,
      text: 'first item'
    },
  ];

  it('should create action for successful item post', () => {
    const expectedAction = {
      type: types.POST_ITEM_SUCCESS,
      payload: {
        item: json,
      }
    };
    const actualAction = actions.postItemSuccess(json);

    expect(actualAction).toEqual(expectedAction);
  });

  it('should create action for failed item post', () => {
    const error = new Error('post item failed');
    const expectedAction = {
      type: types.POST_ITEM_FAILURE,
      payload: {
        error
      }
    };
    const actualAction = actions.postItemFailure(error);

    expect(actualAction).toEqual(expectedAction);
  });

});

