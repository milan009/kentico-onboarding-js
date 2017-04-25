/**
 * Created by VlastimilM on 25.4.2017.
 */
import { addItemCreator, saveItem, deleteItem, startEditingItem, stopEditingItem, updateItemText } from '../../src/actions/actionCreators';
import { ITEM_ADDED, ITEM_SAVED, ITEM_DELETED, START_EDITING_ITEM, STOP_EDITING_ITEM, UPDATE_ITEM_TEXT } from '../../src/actions/actionTypes';


describe('Action Creators', () => {
  it('create ITEM_ADDED action correctly', () => {
    expect(addItemCreator(() => '5')('testText')).toEqual({ type: ITEM_ADDED, text: 'testText', id: '5' });
  });

  it('create ITEM_SAVED action correctly', () => {
    expect(saveItem('5', 'saveText')).toEqual({ type: ITEM_SAVED, id: '5', text: 'saveText' });
  });

  it('create ITEM_DELETED action correctly', () => {
    expect(deleteItem('5')).toEqual({ type: ITEM_DELETED, id: '5' });
  });

  it('create START_EDITING_ITEM action correctly', () => {
    expect(startEditingItem('5')).toEqual({ type: START_EDITING_ITEM, id: '5' });
  });

  it('create STOP_EDITING_ITEM action correctly', () => {
    expect(stopEditingItem('5')).toEqual({ type: STOP_EDITING_ITEM, id: '5' });
  });

  it('create UPDATE_ITEM_TEXT action correctly', () => {
    expect(updateItemText('5', 'newText')).toEqual({ type: UPDATE_ITEM_TEXT, id: '5', text: 'newText' });
  });
});
