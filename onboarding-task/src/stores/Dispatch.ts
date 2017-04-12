import { IAction } from '../interfaces/IAction';

export interface Dispatch {
  (action: IAction): IAction;
}
