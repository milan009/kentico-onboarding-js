import { IAction } from '../actions/IAction';
import { ActionAsync } from '../actions/ActionAsync';

type dispatch = (action: IAction) => IAction;
type dispatchAsync = (actionAsync: ActionAsync) => Promise<IAction>;

export type Dispatch = dispatch & dispatchAsync;
