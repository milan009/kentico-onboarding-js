import { ThunkAction } from './IAction';

export interface IRequestError {
  readonly targetItemId?: string;
  readonly error: Error;
  readonly retryAction: ThunkAction;
}
