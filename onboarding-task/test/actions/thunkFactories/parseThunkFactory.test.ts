import 'isomorphic-fetch';

import {
  PARSE_RESPONSE_STARTED, PARSE_RESPONSE_FINISHED,
} from '../../../src/actions/actionTypes';
import { OrderedMap } from 'immutable';
import { ItemData } from '../../../src/models/ItemData';
import { IItemDTO } from '../../../src/interfaces/IItemDTO';
import { parseItemsFactory } from '../../../src/actions/thunkFactories/parseThunkFactory';
import { ItemsDataMap } from '../../../src/reducers/list/itemsReducer';

describe('ParseItems thunk factory', () => {
  const mockItems = [
    {id: '17', text: 'Popcorn bucket'},
    {id: '71', text: 'Not-so-much-popcorn bucket'}
  ];
  const mockParsedItems: ItemsDataMap = OrderedMap([
    [
      '17',
      new ItemData({
        id: '17',
        text: 'Popcorn bucket',
      }),
    ],
    [
      '71',
      new ItemData({
        id: '71',
        text: 'Not-so-much-popcorn bucket',
      }),
    ],
  ]);

  const mockParser = (_: IItemDTO[]) => Promise.resolve(mockParsedItems);

  it(`dispatches "${PARSE_RESPONSE_STARTED}" and "${PARSE_RESPONSE_FINISHED}" action with valid json`, async () => {
    const expectedActions = [
      {
        type: PARSE_RESPONSE_STARTED,
        payload: {
          jsonResponse: mockItems,
        },
      },
      {
        type: PARSE_RESPONSE_FINISHED,
        payload: {
          parsedItems: mockParsedItems,
        },
      },
    ];
    const dispatch = jest.fn();
    const parseItemsThunk = parseItemsFactory(mockParser);

    await parseItemsThunk(mockItems)(dispatch);

    expect(dispatch.mock.calls[0][0]).toEqual(expectedActions[0]);
    expect(dispatch.mock.calls[1][0]).toEqual(expectedActions[1]);
  });
});

