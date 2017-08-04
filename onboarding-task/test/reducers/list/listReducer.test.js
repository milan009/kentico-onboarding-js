import { OrderedMap } from 'immutable';

import * as actionCreators from '../../../src/actions/actionCreators';
import { listReducer } from '../../../src/reducers/list/listReducer';
import { ItemFlags } from '../../../src/models/ItemFlags';
import { ItemData } from '../../../src/models/ItemData';
import * as testData from '../../testUtils/testData';

describe('List reducer', () => {
  const mockListState = {
    itemsById: testData.mockItemsDataMapWithTwoDataItems,
    itemFlagsMap: testData.mockItemsFlagsMapWithTwoFlagsItems,
  };

  it('adds item and ItemFlags correctly with undefined state', () => {
    const expectedState = {
      itemsById: testData.mockItemsDataMapWithSingleDataItem,
      itemFlagsMap: testData.mockItemsFlagsMapWithSingleFlagsItem,
    };
    const action = actionCreators.createItemFactory({ idGenerator: testData.mockIdGenerators[0] })(testData.mockTexts[0]);

    const createdState = listReducer(undefined, action);

    expect(createdState).toEqual(expectedState);
  });

  it('makes an item editable correctly', () => {
    const expectedState = {
      itemsById: testData.mockItemsDataMapWithTwoDataItems,
      itemFlagsMap: new OrderedMap([
        [
          testData.mockIds[0],
          new ItemFlags({
            isBeingEdited: true,
          }),
        ],
        [
          testData.mockIds[1],
          testData.mockItemFlagsObjects[1],
        ],
      ]),
    };
    const action = actionCreators.makeEditable(testData.mockIds[0]);

    const createdState = listReducer(mockListState, action);

    expect(createdState).toEqual(expectedState);
  });

  it('cancels changes correctly', () => {
    const expectedState = {
      itemsById: testData.mockItemsDataMapWithTwoDataItems,
      itemFlagsMap: new OrderedMap([
        [
          testData.mockIds[0],
          testData.mockItemFlagsObjects[0],
        ],
        [
          testData.mockIds[1],
          new ItemFlags(),
        ],
      ]),
    };
    const action = actionCreators.cancelChange(testData.mockIds[1]);

    const createdState = listReducer(mockListState, action);

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
          testData.mockItemDataObjects[1],
        ],
      ]),
      itemFlagsMap: new OrderedMap([
        [
          testData.mockIds[0],
          new ItemFlags(),
        ],
        [
          testData.mockIds[1],
          testData.mockItemFlagsObjects[1],
        ],
      ]),
    };
    const action = actionCreators.saveChange(testData.mockIds[0], 'Slock');

    const createdState = listReducer(mockListState, action);

    expect(createdState).toEqual(expectedState);
  });

  it('does not change state with unknown action', () => {
    const expectedState = mockListState;
    const action = testData.unknownAction;

    const createdState = listReducer(mockListState, action);

    expect(createdState).toEqual(expectedState);
  });
});
