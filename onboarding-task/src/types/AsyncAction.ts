import { Dispatch } from './Dispatch';
import { IAction } from '../actions/IAction';

export type AsyncAction = (dispatch: Dispatch) => Promise<IAction>;
