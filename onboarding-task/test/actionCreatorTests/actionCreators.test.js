import { addItem, deleteItem, editItem, saveChangesToItem, cancelChangesToItem } from '../../src/actionCreators/actionCreators.js';
import { ADD_ITEM, DELETE_ITEM, EDIT_ITEM, SAVE_CHANGES_TO_ITEM, CANCEL_CHANGES_TO_ITEM } from '../../src/actionTypes.js';
import { createGuid } from '../../src/utils/guidHelper.js';

describe('Correctly creates actions', () => {
  const id = createGuid();
  const text = 'test text';
  it('Action to add an item', () => {
    const expectedActionCreator = addItem({ type: ADD_ITEM, id, text });
    const testedItem = addItem(text);
    expect(expectedActionCreator.text).toBe(testedItem.text);
    expect(expectedActionCreator.type).toBe(testedItem.type);
  });

  it('Action to delete an item', () => {
    const expectedActionCreator = deleteItem({ type: DELETE_ITEM, id });
    const testedItem = addItem(id);
    expect(expectedActionCreator.id).toBe(testedItem.id);
    expect(expectedActionCreator.type).toBe(testedItem.type);
  });

  it('Action to edit an item', () => {
    const expectedActionCreator = editItem({ type: EDIT_ITEM, id });
    const testedItem = addItem(id);
    expect(expectedActionCreator.id).toBe(testedItem.id);
    expect(expectedActionCreator.type).toBe(testedItem.type);
  });
  it('Action to save the changes done to an item', () => {
    const expectedActionCreator = saveChangesToItem({ type: SAVE_CHANGES_TO_ITEM, id, text });
    const testedItem = addItem(id, text);
    expect(expectedActionCreator.text).toBe(testedItem.text);
    expect(expectedActionCreator.type).toBe(testedItem.type);
  });
  it('Action to delete the changes done to an item', () => {
    const expectedActionCreator = cancelChangesToItem({ type: CANCEL_CHANGES_TO_ITEM, id });
    const testedItem = addItem(id);
    expect(expectedActionCreator.id).toBe(testedItem.id);
    expect(expectedActionCreator.type).toBe(testedItem.type);
  });
});
