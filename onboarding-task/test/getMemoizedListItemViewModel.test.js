import { getMemoizedListItemViewModel } from '../src/containers/ListItemContainer';
import { ItemRecord } from '../src/models/ItemRecord.ts';

describe('getMemoizedListItemViewModel ', () => {
  it('returns correct ListItemViewModel when correct item, true and 5 is passed in', () => {
    const item = new ItemRecord({ id: 'test-id', text: 'test' });
    const expectedResult = { id: 'test-id', text: 'test', formDisplayed: true, index: 5 };
    const actualResult = getMemoizedListItemViewModel(item, true, 5);

    expect(actualResult).toEqual(expectedResult);
  });

  it('returns correct ListItemViewModel when correct item, false and 1 is passed in', () => {
    const item = new ItemRecord({ id: 'test-id', text: 'test' });
    const expectedResult = { id: 'test-id', text: 'test', formDisplayed: false, index: 1 };
    const actualResult = getMemoizedListItemViewModel(item, false, 1);

    expect(actualResult).toEqual(expectedResult);
  });
});
