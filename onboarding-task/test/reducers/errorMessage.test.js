import { OrderedMap } from 'immutable';
import { errorMessage } from '../../src/reducers/errorMessage.ts';
import { createErrorMessageWithoutDependency, deleteErrorMessage } from '../../src/actions/errorMessageActionCreators.ts';
import { ErrorMessage } from '../../src/models/ErrorMessage.ts';

describe('errorMessage', () => {
  const firstTestId = '0aeeaa2b-1a2a-482c-b2a6-b172109071e7';
  const createErrorMessage = createErrorMessageWithoutDependency(() => firstTestId);

  it('should return initial state', () => {
    const expectedErrorMessage = OrderedMap();
    const errorMessageBefore = undefined;

    const errorMessageAfter = errorMessage(errorMessageBefore, { type: 'NOT_DEFINED' });

    expect(errorMessageAfter).toEqual(expectedErrorMessage);
  });

  it('should handle create error message', () => {
    const expectedErrorMessage = OrderedMap({ [firstTestId]: new ErrorMessage({ id: firstTestId, message: 'error message' }) });
    const errorMessageBefore = OrderedMap();

    const errorMessageAfter = errorMessage(errorMessageBefore, createErrorMessage(new Error('error message')));

    expect(errorMessageAfter).toEqual(expectedErrorMessage);
  });

  it('should handle delete error message', () => {
    const expectedErrorMessage = OrderedMap();
    const errorMessageBefore = OrderedMap({ [firstTestId]: new ErrorMessage({ id: firstTestId, message: 'error message' }) });

    const errorMessageAfter = errorMessage(errorMessageBefore, deleteErrorMessage(firstTestId));

    expect(errorMessageAfter).toEqual(expectedErrorMessage);
  });
});
