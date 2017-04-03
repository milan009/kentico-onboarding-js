import { errorMessage } from '../../src/reducers/errorMessage.ts';
import { failFetchItems } from '../../src/actions/fetchItemsFactory.ts';
import { failPostItem } from '../../src/actions/postItemFactory.ts';

describe('errorMessage', () => {

  it('should return initial state', () => {
    const expectedErrorMessage = '';
    const errorMessageBefore = undefined;

    const errorMessageAfter = errorMessage(errorMessageBefore, { type: 'NOT_DEFINED' });

    expect(errorMessageAfter).toEqual(expectedErrorMessage);
  });

  it('should handle fetch item fail', () => {
    const expectedErrorMessage = new Error('error message');
    const errorMessageBefore = undefined;

    const errorMessageAfter = errorMessage(errorMessageBefore, failFetchItems(new Error('error message')));

    expect(errorMessageAfter).toEqual(expectedErrorMessage);
  });

  it('should handle post item fail', () => {
    const expectedErrorMessage = new Error('error message');
    const errorMessageBefore = undefined;

    const errorMessageAfter = errorMessage(errorMessageBefore, failPostItem(new Error('error message')));

    expect(errorMessageAfter).toEqual(expectedErrorMessage);
  });
});
