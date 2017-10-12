import { ThunkAction } from './IAction';

export interface IRequestError {
  readonly id?: string;
  readonly error: Error;
  readonly action: ThunkAction;
}
