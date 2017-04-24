import { IAction } from '../actions/IAction';
import { AsyncAction } from './AsyncAction';

type dispatch = (action: IAction) => IAction;
type dispatchAsync = (actionAsync: AsyncAction) => Promise<IAction>;

export type Dispatch = dispatch & dispatchAsync;
