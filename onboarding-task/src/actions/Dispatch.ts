import { IAction } from './IAction';
import { IAppState } from '../models/IAppState';

type getStateCallback = () => IAppState;

type basicDispatch = (action: IAction) => IAction;
type thunkDispatch = (thunkAction: ((dispatch: dispatchType, getState: getStateCallback) => Promise<IAction>)) => Promise<IAction>;
export type dispatchType = basicDispatch & thunkDispatch;

export { dispatchType as Dispatch}
