import { List } from 'immutable';
import { ADD_ITEM, DELETE_ITEM } from '../../src/constants/actionTypes.js';
import { itemIdsReducer } from '../../src/reducers/itemIdsReducer.js';

describe('Correctly adds and removes item Ids: ', () => {
  const fakeId = '23456899-df58-1bbf-1j8p-4asd582z69d8';
  const text = 'text';
  it('Reducer for adding a new Id into an unexisting List', () => {
    const action = { type: ADD_ITEM, payload: { id: fakeId, text } };
    const expected = List.of(fakeId);

    const tested = itemIdsReducer(undefined, action);

    expect(tested).toEqual(expected);
  });

  it('Reducer for adding a new Id into a nonempty List', () => {
    const action = { type: ADD_ITEM, payload: { id: fakeId, text } };
    const firstId = 's54d8e2x-15e8-4s52-e44s-ad71e2d5zz40';
    const initialState = List.of(firstId);
    const expected = List.of(firstId, fakeId);

    const tested = itemIdsReducer(initialState, action);

    expect(tested).toEqual(expected);
  });

  it('Reducer for deleting an Id', () => {
    const action = { type: DELETE_ITEM, payload: { id: fakeId } };
    const initialState = List.of(fakeId);
    const expected = List();

    const tested = itemIdsReducer(initialState, action);

    expect(tested).toEqual(expected);
  });

  it('Reducer with unknown action', () => {
    const action = { type: 'I AM UNKNOWN', payload: { id: fakeId } };
    const initialState = List.of(fakeId);

    const tested = itemIdsReducer(initialState, action);

    expect(tested).toEqual(initialState);
  });

});
