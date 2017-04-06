import { OrderedMap } from 'immutable';
import { errorMessages } from '../../src/reducers/errorMessages.ts';
import { createErrorMessageWithoutDependency, deleteErrorMessage } from '../../src/actions/errorMessageActionCreators.ts';
import { ErrorMessage } from '../../src/models/ErrorMessage.ts';

describe('errorMessages', () => {
  const firstTestId = '0aeeaa2b-1a2a-482c-b2a6-b172109071e7';
  const createErrorMessage = createErrorMessageWithoutDependency(() => firstTestId);

  it('should return initial state', () => {
    const expectedErrorMessages = OrderedMap();
    const errorMessagesBefore = undefined;

    const errorMessagesAfter = errorMessages(errorMessagesBefore, { type: 'NOT_DEFINED' });

    expect(errorMessagesAfter).toEqual(expectedErrorMessages);
  });

  it('should handle create error message', () => {
    const expectedErrorMessages = OrderedMap({ [firstTestId]: new ErrorMessage({ id: firstTestId, message: 'error message' }) });
    const errorMessagesBefore = OrderedMap();

    const errorMessagesAfter = errorMessages(errorMessagesBefore, createErrorMessage(new Error('error message')));

    expect(errorMessagesAfter).toEqual(expectedErrorMessages);
  });

  it('should handle delete error message', () => {
    const expectedErrorMessages = OrderedMap();
    const errorMessagesBefore = OrderedMap({ [firstTestId]: new ErrorMessage({ id: firstTestId, message: 'error message' }) });

    const errorMessagesAfter = errorMessages(errorMessagesBefore, deleteErrorMessage(firstTestId));

    expect(errorMessagesAfter).toEqual(expectedErrorMessages);
  });
});
