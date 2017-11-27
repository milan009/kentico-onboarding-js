import { IRequestError } from './IRequestError';

export interface IStatus {
  isFetching: boolean;
  requestError: IRequestError | null;
}

