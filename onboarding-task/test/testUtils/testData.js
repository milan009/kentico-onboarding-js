import { OrderedMap } from 'immutable';

import { ItemData } from '../../src/models/ItemData';
import { ItemFlags } from '../../src/models/ItemFlags';
import { mockIdGenerator } from './mockIdGenerator';

export const mockDefaultId = mockIdGenerator(0);
export const mockIdGenerators = [() => mockIdGenerator(1), () => mockIdGenerator(2), () => mockIdGenerator(3)];
export const mockIds = [mockIdGenerators[0](), mockIdGenerators[1](), mockIdGenerators[2]()];

// region ItemData mock data
export const mockTexts = ['Mlok', 'Glock', 'Block'];

export const mockItemDataObjects = [
  new ItemData({ id: mockIds[0], text: mockTexts[0] }),
  new ItemData({ id: mockIds[1], text: mockTexts[1] }),
  new ItemData({ id: mockIds[2], text: mockTexts[2] }),
];

export const mockItemsDataMapWithSingleDataItem = new OrderedMap([
  [
    mockIds[0],
    mockItemDataObjects[0],
  ],
]);
export const mockItemsDataMapWithTwoDataItems = new OrderedMap([
  [
    mockIds[0],
    mockItemDataObjects[0],
  ],
  [
    mockIds[1],
    mockItemDataObjects[1],
  ],
]);
// endregion

// region ItemFlags mock data
export const mockEditableFlags = [false, true, false];

export const mockItemFlagsObjects = [
  new ItemFlags({ isBeingEdited: mockEditableFlags[0] }),
  new ItemFlags({ isBeingEdited: mockEditableFlags[1] }),
  new ItemFlags({ isBeingEdited: mockEditableFlags[2] }),
];

export const mockItemsFlagsEmptyMap = new OrderedMap();
export const mockItemsFlagsMapWithSingleFlagsItem = new OrderedMap([
  [
    mockIds[0],
    mockItemFlagsObjects[0],
  ],
]);
export const mockItemsFlagsMapWithTwoFlagsItems = new OrderedMap([
  [
    mockIds[0],
    mockItemFlagsObjects[0],
  ],
  [
    mockIds[1],
    mockItemFlagsObjects[1],
  ],
]);
// endregion

export const unknownAction = {
  type: 'Whatever',
  unknownParam: 177,
  payload: {
    target: null,
    undefinedParam: undefined,
  },
};
