import { OrderedMap } from 'immutable';

import * as actionCreators from '../../../src/actions/actionCreators';
import { listReducer } from '../../../src/reducers/list/listReducer';
import { ItemData } from '../../../src/models/ItemData';
import { ItemFlags } from '../../../src/models/ItemFlags';
import * as testData from '../../testUtils/testData';

describe('List reducer', () => {
  const defaultListState = {
    itemsById: new OrderedMap([
      [
        testData.mockIds[0],
        new ItemData({
          id: testData.mockIds[0],
          text: 'Mlock',
        }),
      ],
      [
        testData.mockIds[1],
        new ItemData({
          id: testData.mockIds[1],
          text: 'Block',
        }),
      ],
    ]),
    itemFlagsMap: new OrderedMap([
      [
        testData.mockIds[0],
        new ItemFlags({
          isBeingEdited: true,
        }),
      ],
      [
        testData.mockIds[1],
        new ItemFlags(),
      ],
    ]),
  };

  it('adds item and ItemFlags correctly into undefined list', () => {
    const expectedState = {
      itemsById: new OrderedMap([
        [
          testData.mockIds[0],
          new ItemData({
            id: testData.mockIds[0],
            text: 'Mlok',
          }),
        ],
      ]),
      itemFlagsMap: new OrderedMap([
        [
          testData.mockIds[0],
          new ItemFlags({
            isBeingEdited: false,
          }),
        ],
      ]),
    };
    const action = actionCreators.createItemFactory({ idGenerator: testData.mockIdGenerators[0] })('Mlok');

    const createdState = listReducer(undefined, action);

    expect(createdState).toEqual(expectedState);
  });

  it('makes an item editable correctly', () => {
    const expectedState = {
      itemsById: new OrderedMap([
        [
          testData.mockIds[0],
          new ItemData({
            id: testData.mockIds[0],
            text: 'Mlock',
          }),
        ],
        [
          testData.mockIds[1],
          new ItemData({
            id: testData.mockIds[1],
            text: 'Block',
          }),
        ],
      ]),
      itemFlagsMap: new OrderedMap([
        [
          testData.mockIds[0],
          new ItemFlags({
            isBeingEdited: true,
          }),
        ],
        [
          testData.mockIds[1],
          new ItemFlags({
            isBeingEdited: true,
          }),
        ],
      ]),
    };
    const action = actionCreators.makeEditable(testData.mockIds[1]);

    const createdState = listReducer(defaultListState, action);

    expect(createdState).toEqual(expectedState);
  });

  it('cancels changes correctly', () => {
    const expectedState = {
      itemsById: new OrderedMap([
        [
          testData.mockIds[0],
          new ItemData({
            id: testData.mockIds[0],
            text: 'Mlock',
          }),
        ],
        [
          testData.mockIds[1],
          new ItemData({
            id: testData.mockIds[1],
            text: 'Block',
          }),
        ],
      ]),
      itemFlagsMap: new OrderedMap([
        [
          testData.mockIds[0],
          new ItemFlags(),
        ],
        [
          testData.mockIds[1],
          new ItemFlags(),
        ],
      ]),
    };
    const action = actionCreators.cancelChange(testData.mockIds[0]);

    const createdState = listReducer(defaultListState, action);

    expect(createdState).toEqual(expectedState);
  });

  it('saves changed item correctly', () => {
    const expectedState = {
      itemsById: new OrderedMap([
        [
          testData.mockIds[0],
          new ItemData({
            id: testData.mockIds[0],
            text: 'Slock',
          }),
        ],
        [
          testData.mockIds[1],
          new ItemData({
            id: testData.mockIds[1],
            text: 'Block',
          }),
        ],
      ]),
      itemFlagsMap: new OrderedMap([
        [
          testData.mockIds[0],
          new ItemFlags(),
        ],
        [
          testData.mockIds[1],
          new ItemFlags(),
        ],
      ]),
    };
    const action = actionCreators.saveChange(testData.mockIds[0], 'Slock');

    const createdState = listReducer(defaultListState, action);

    expect(createdState).toEqual(expectedState);
  });
});
