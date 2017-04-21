import { IAction } from '../actionCreators/IAction';

export interface Dispatch {
  (action: IAction): IAction;
}
