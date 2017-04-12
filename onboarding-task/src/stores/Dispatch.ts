import { IAction } from '../actions/IAction';

type dispatchAction = (action: IAction) => IAction;
type dispatchThunk = (thunkAction: ((dispatch: (action: IAction) => IAction) => Promise<IAction>)) => Promise<IAction>;
type  TDispatch = dispatchThunk & dispatchAction;

export { TDispatch as Dispatch};
