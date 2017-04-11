import { isFetching } from '../../src/reducers/isFetching.ts';
import { requestItems, receiveItems } from '../../src/actions/fetchItemsFactory.ts';
import { failFetchItems } from '../../src/actions/itemsActionCreators.ts';

describe('isFetching reducer', () => {
  it('should return initial state', () => {
    const expectedIsFetching = false;
    const isFetchingBefore = undefined;

    const isFetchingAfter = isFetching(isFetchingBefore, { type: 'NOT_DEFINED', payload: undefined });

    expect(isFetchingAfter).toEqual(expectedIsFetching);
  });

  it('should handle request items', () => {
    const expectedIsFetching = true;
    const isFetchingBefore = undefined;

    const isFetchingAfter = isFetching(isFetchingBefore, requestItems());

    expect(isFetchingAfter).toEqual(expectedIsFetching);
  });

  it('should handle receive items', () => {
    const expectedIsFetching = false;
    const isFetchingBefore = undefined;

    const isFetchingAfter = isFetching(isFetchingBefore, receiveItems({}));

    expect(isFetchingAfter).toEqual(expectedIsFetching);
  });

  it('should handle fail fetch items', () => {
    const expectedIsFetching = false;
    const isFetchingBefore = undefined;

    const isFetchingAfter = isFetching(isFetchingBefore, failFetchItems(new Error()));

    expect(isFetchingAfter).toEqual(expectedIsFetching);
  });
});
