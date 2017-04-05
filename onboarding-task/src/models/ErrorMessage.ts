import { Record } from 'immutable';

interface IErrorMessage {
  id: string;
  message: string;
}

const defaultValues: IErrorMessage = {
  id: '00000000-0000-0000-0000-000000000000',
  message: '',
};

class ErrorMessage extends Record(defaultValues) implements IErrorMessage {
  readonly id: string;
  readonly message: string;
}

export { IErrorMessage, ErrorMessage };
