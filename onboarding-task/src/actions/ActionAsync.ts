import { Dispatch } from '../types/Dispatch';
import { IAction } from './IAction';

export type ActionAsync = (dispatch: Dispatch) => Promise<IAction>;
