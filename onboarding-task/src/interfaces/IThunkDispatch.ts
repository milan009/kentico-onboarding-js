import { Dispatch } from 'react-redux';

import { IAction, ThunkAction } from './IAction';

export interface IThunkDispatch<S> extends Dispatch<S> {
  (asyncAction: ThunkAction): IAction;
}
