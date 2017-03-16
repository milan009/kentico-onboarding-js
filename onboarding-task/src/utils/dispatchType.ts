import { IAction } from '../interfaces/IAction';

export type dispatchType = (action: IAction | ((dispatch: dispatchType) => Promise<IAction>)) => IAction;
