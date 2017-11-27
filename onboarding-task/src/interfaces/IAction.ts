import { Dispatch } from 'react-redux';
import { IStore } from './IStore';

export interface IAction {
  type: string;
  payload?: any;
}

export type ThunkAction = (dispatch: Dispatch<IStore>) => Promise<IAction>;

