import { ThunkAction } from './IAction';

export interface IRequestError {
  readonly displayList: boolean;
  readonly error: Error;
  readonly action: ThunkAction;
}
