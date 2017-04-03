import { IAction } from '../interfaces/IAction';
import { IAppState } from '../interfaces/IAppState';


type dispatchAction = (action: IAction) => IAction;
type dispatchThunk = (thunkAction: ((dispatch: (action: IAction) => IAction, getState: () => IAppState) => Promise<IAction>)) => Promise<IAction>;
export type  dispatchType = dispatchThunk & dispatchAction;
