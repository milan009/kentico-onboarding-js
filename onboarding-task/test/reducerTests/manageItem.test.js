import { Map } from 'immutable';
import { Item } from '../../src/models/Item.js';
import { editItem, saveChangesToItem, cancelChangesToItem } from '../../src/actionCreators/actionCreators.js';
import { addItemFactory } from '../../src/actionCreators/addItemFactory';
import { manageItem } from '../../src/reducers/manageItem.js';

describe('Correctly creates separate item reducers', () => {
  const id = '82xc89c4-s58s-55s6-2z57-10sd5w8a6h12';
  const text = 'test text';

  it('Reducer for creating an Item', () => {
    const fakeIdGenerator = () => '23456899-df58-1bbf-1j8p-4asd582z69d8';
    const fakeId = fakeIdGenerator();
    const expected = new Item({ text, id: fakeId, isEdited: false });
    const creationAction = addItemFactory(fakeIdGenerator)(text);

    const tested = manageItem(undefined, creationAction);

    expect(tested).toEqual(expected);
  });

  it('Reducer for editing an Item', () => {
    const initialItem = new Item({ text, id, isEdited: false });
    const expected = new Item({ id, text, isEdited: true });
    const editAction = editItem(id);

    const tested = manageItem(initialItem, editAction);

    expect(tested).toEqual(expected);
  });

  it('Reducer for saving the changes done to an Item', () => {
    const initialItem = new Item({ id, text, isEdited: true });
    const editedText = 'text was changed';
    const expected = new Item({ id, text: editedText, isEdited: false });
    const saveChangesAction = saveChangesToItem(id, editedText);

    const tested = manageItem(initialItem, saveChangesAction);

    expect(tested).toEqual(expected);
  });

  it('Reducer for cancelling the changes done to an Item', () => {
    const initialItem = new Item({ id, text, isEdited: true });
    const expected = new Item({ text, id, isEdited: false });
    const cancelChangesAction = cancelChangesToItem(id);

    const tested = manageItem(initialItem, cancelChangesAction);

    expect(tested).toEqual(expected);
  });

  it('Reducer with unknown action', () => {
    const initialItem = new Item({ text, id, isEdited: false });
    const unknownAction = { type: 'TEST_ME', id };

    const tested = manageItem(initialItem, unknownAction);

    expect(tested).toEqual(initialItem);
  });
});
