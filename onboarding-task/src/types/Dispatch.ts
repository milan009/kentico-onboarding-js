import { IAction } from '../interfaces/state/IAction';

export type Dispatch = (action: IAction) => IAction;
