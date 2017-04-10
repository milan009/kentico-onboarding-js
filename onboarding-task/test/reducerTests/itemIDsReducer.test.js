import { List } from 'immutable';
import { ADD_ITEM, DELETE_ITEM } from '../../src/constants/actionTypes.js';
import { itemIDsReducer } from '../../src/reducers/itemIDsReducer.js';

describe('Correctly adds and removes item IDs: ', () => {
  const fakeID = '23456899-df58-1bbf-1j8p-4asd582z69d8';
  const text = 'text';
  it('Reducer for adding a new ID into an unexisting List', () => {
    const action = { type: ADD_ITEM, payload: { id: fakeID, text } };
    const expected = List.of(fakeID);

    const tested = itemIDsReducer(undefined, action);

    expect(tested).toEqual(expected);
  });

  it('Reducer for adding a new ID into a nonempty List', () => {
    const action = { type: ADD_ITEM, payload: { id: fakeID, text } };
    const firstID = 's54d8e2x-15e8-4s52-e44s-ad71e2d5zz40';
    const initialState = List.of(firstID);
    const expected = List.of(firstID, fakeID);

    const tested = itemIDsReducer(initialState, action);

    expect(tested).toEqual(expected);
  });

  it('Reducer for deleting an ID', () => {
    const action = { type: DELETE_ITEM, payload: { id: fakeID } };
    const initialState = List.of(fakeID);
    const expected = List();

    const tested = itemIDsReducer(initialState, action);

    expect(tested).toEqual(expected);
  });

  it('Reducer with unknown action', () => {
    const action = { type: 'I AM UNKNOWN', payload: { id: fakeID } };
    const initialState = List.of(fakeID);

    const tested = itemIDsReducer(initialState, action);

    expect(tested).toEqual(initialState);
  });

});
