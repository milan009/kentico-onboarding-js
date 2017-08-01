import { OrderedMap } from 'immutable';

import * as actionCreators from '../../../src/actions/actionCreators';
import { listReducer } from '../../../src/reducers/list/listReducer';
import { ItemData } from '../../../src/models/ItemData';
import { ItemFlags } from '../../../src/models/ItemFlags';

describe('List reducer', () => {
  const defaultListState = {
    itemsById: new OrderedMap([
      [
        '0',
        new ItemData({
          text: 'Mlock',
        }),
      ],
      [
        '1',
        new ItemData({
          text: 'Block',
        }),
      ],
    ]),
    itemFlagsMap: new OrderedMap([
      [
        '0',
        new ItemFlags({
          isBeingEdited: true,
        }),
      ],
      [
        '1',
        new ItemFlags(),
      ],
    ]),
  };

  it('adds item and ItemFlags correctly into undefined list', () => {
    const mockId = '12345678-0000-0000-0000-000000000000';
    const mockIdCreator = () => mockId;
    const expectedState = {
      itemsById: new OrderedMap([
        [
          mockId,
          new ItemData({
            text: 'Mlok',
          }),
        ],
      ]),
      itemFlagsMap: new OrderedMap([
        [
          mockId,
          new ItemFlags({
            isBeingEdited: false,
          }),
        ],
      ]),
    };
    const action = actionCreators.createItem('Mlok', mockIdCreator);

    const createdState = listReducer(undefined, action);

    expect(createdState).toEqual(expectedState);
  });

  it('makes an item editable correctly', () => {
    const expectedState = {
      itemsById: new OrderedMap([
        [
          '0',
          new ItemData({
            text: 'Mlock',
          }),
        ],
        [
          '1',
          new ItemData({
            text: 'Block',
          }),
        ],
      ]),
      itemFlagsMap: new OrderedMap([
        [
          '0',
          new ItemFlags({
            isBeingEdited: true,
          }),
        ],
        [
          '1',
          new ItemFlags({
            isBeingEdited: true,
          }),
        ],
      ]),
    };
    const action = actionCreators.makeEditable('1');

    const createdState = listReducer(defaultListState, action);

    expect(createdState).toEqual(expectedState);
  });

  it('cancels changes correctly', () => {
    const expectedState = {
      itemsById: new OrderedMap([
        [
          '0',
          new ItemData({
            text: 'Mlock',
          }),
        ],
        [
          '1',
          new ItemData({
            text: 'Block',
          }),
        ],
      ]),
      itemFlagsMap: new OrderedMap([
        [
          '0',
          new ItemFlags(),
        ],
        [
          '1',
          new ItemFlags(),
        ],
      ]),
    };
    const action = actionCreators.cancelChange('0');

    const createdState = listReducer(defaultListState, action);

    expect(createdState).toEqual(expectedState);
  });

  it('saves changed item correctly', () => {
    const expectedState = {
      itemsById: new OrderedMap([
        [
          '0',
          new ItemData({
            text: 'Slock',
          }),
        ],
        [
          '1',
          new ItemData({
            text: 'Block',
          }),
        ],
      ]),
      itemFlagsMap: new OrderedMap([
        [
          '0',
          new ItemFlags(),
        ],
        [
          '1',
          new ItemFlags(),
        ],
      ]),
    };
    const action = actionCreators.saveChange('0', 'Slock');

    const createdState = listReducer(defaultListState, action);

    expect(createdState).toEqual(expectedState);
  });
});
