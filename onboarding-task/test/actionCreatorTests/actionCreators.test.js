import { deleteItem, editItem, saveChangesToItem, cancelChangesToItem } from '../../src/actionCreators/actionCreators.js';
import { addItemFactory } from '../../src/actionCreators/addItemFactory';
import { ADD_ITEM, DELETE_ITEM, EDIT_ITEM, SAVE_CHANGES_TO_ITEM, CANCEL_CHANGES_TO_ITEM } from '../../src/actionTypes.js';

describe('Correctly creates actions', () => {
  const fakeId = '07b2b519-e303-1bbf-8ba7-9b986a0d15fc';
  const generateFakeId = () => '11111111-e303-1bbf-8ba7-9b986a0d15fc';
  const text = 'test text';

  it('Action to add an item', () => {
    const expectedAction = { type: ADD_ITEM, id: generateFakeId(), text };

    const testedAction = addItemFactory(generateFakeId)(text);

    expect(testedAction).toEqual(expectedAction);
  });

  it('Action to delete an item', () => {
    const expectedAction = { type: DELETE_ITEM, id: fakeId };

    const testedAction = deleteItem(fakeId);

    expect(testedAction).toEqual(expectedAction);
  });

  it('Action to edit an item', () => {
    const expectedAction = { type: EDIT_ITEM, id: fakeId };

    const testedAction = editItem(fakeId);

    expect(testedAction).toEqual(expectedAction);
  });

  it('Action to save the changes done to an item', () => {
    const expectedAction = { type: SAVE_CHANGES_TO_ITEM, id: fakeId, text };

    const testedAction = saveChangesToItem(fakeId, text);

    expect(expectedAction).toEqual(testedAction);
  });

  it('Action to delete the changes done to an item', () => {
    const expectedAction = { type: CANCEL_CHANGES_TO_ITEM, id: fakeId };

    const testedAction = cancelChangesToItem(fakeId);

    expect(expectedAction).toEqual(testedAction);
  });
});
